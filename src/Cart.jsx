import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeCartItem,
  clearCart,
} from "./store/CartSlice";
import { placeOrder } from "./store/OrderPlaceSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus, faMinus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { sendOrderEmail } from "./SendOrderEmail";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Coupon from "./Coupon";
import { createPaymentOrder, verifyPayment } from "./store/PaymentSlice";
import ConfirmDialog from "./ConfirmDialog";

function Cart() {
  const [placingOrder, setPlacingOrder] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Dialog state
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "default",
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: null,
  });

  const openDialog = (options) => setDialog({ isOpen: true, ...options });
  const closeDialog = () => setDialog((prev) => ({ ...prev, isOpen: false }));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const { applied, discount } = useSelector((state) => state.coupon);

  const user = JSON.parse(sessionStorage.getItem("user")) || {};

  // Load Razorpay SDK dynamically
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onerror = () => toast.error("Failed to load Razorpay SDK.");
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (applied) {
      toast.success(`Coupon applied! ${discount}% off`);
    }
  }, [applied, discount]);

  // ================= PRICE CALCULATIONS =================

  const allCalculations = useMemo(() => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const couponDiscountAmount = (totalAmount * discount) / 100;
    const gstPercentage = 18;
    const gstTaxAmount = (gstPercentage / 100) * totalAmount;
    const amountToBePaid = totalAmount + gstTaxAmount - couponDiscountAmount;

    return {
      totalAmount,
      totalItems,
      couponDiscountAmount,
      gstTaxAmount,
      amountToBePaid,
      gstPercentage,
    };
  }, [cartItems, discount]);

  // ================= PAYMENT =================

  const handleRazorpayPayment = async () => {
    if (processingPayment) return;

    if (!cartItems.length) { toast.error("Cart is empty!"); return; }
    if (!user?.name) { toast.error("Please login to place order"); navigate("/login"); return; }
    if (!window.Razorpay) { toast.error("Razorpay not loaded. Please refresh."); return; }

    try {
      setProcessingPayment(true);

      const result = await dispatch(
        createPaymentOrder(allCalculations.amountToBePaid)
      ).unwrap();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: result.amount,
        currency: "INR",
        name: "Cafe Horizon",
        description: "Food Order Payment",
        order_id: result.id,

        handler: async function (response) {
          try {
            const verifyResult = await dispatch(
              verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            ).unwrap();

            if (verifyResult.success) {
              toast.success("Payment verified!");
              await handleCheckout("Razorpay");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error("Verification failed");
          } finally {
            setProcessingPayment(false);
          }
        },

        modal: { ondismiss: () => setProcessingPayment(false) },
        prefill: { name: user.name || "", email: user.email || "", contact: user.phone || "" },
        theme: { color: "#0f172a" },
      };

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", (response) => {
        toast.error("Payment failed: " + response.error.description);
        setProcessingPayment(false);
      });
      razor.open();

    } catch (error) {
      console.error(error);
      toast.error(
        error?.message?.includes("Failed to fetch")
          ? "Cannot connect to payment server. Make sure backend is running."
          : "Payment initiation failed. Please try again."
      );
      setProcessingPayment(false);
    }
  };

  // ================= CHECKOUT =================

  const handleCheckout = async (paymentType = "COD") => {
    if (!cartItems.length) { toast.error("Cart is empty!"); return; }
    if (!user?.name) { toast.error("Please login to place order"); navigate("/login"); return; }

    const orderData = {
      orderId: Date.now(),
      customerName: user.name || "Guest",
      email: user.email || "Not Specified",
      items: cartItems,
      totalAmount: allCalculations.amountToBePaid.toFixed(2),
      paymentType: paymentType,
      status: "Pending",
      orderDate: new Date().toISOString(),
      couponPercentage: discount,
      gstTaxAmount: allCalculations.gstTaxAmount.toFixed(2),
      couponDiscountAmount: allCalculations.couponDiscountAmount.toFixed(2),
      amountToBePaid: allCalculations.amountToBePaid.toFixed(2),
    };

    try {
      setPlacingOrder(true);

      await sendOrderEmail(cartItems, user, orderData);
      await dispatch(placeOrder(orderData)).unwrap();

      dispatch(clearCart());

      // Replace Swal with ConfirmDialog
      openDialog({
        title: "Order Placed!",
        message: `Order #${orderData.orderId} placed successfully!`,
        type: "success",
        confirmText: "View Orders",
        cancelText: "Go to Home",
        onConfirm: () => { closeDialog(); navigate("/orders"); },
        onClose: () => { closeDialog(); navigate("/"); },
      });

    } catch (error) {
      toast.error("Order failed. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  // ================= CART ITEMS =================

const itemsCart = cartItems.map((item) => (
  <li key={item.id} className="cart-item">
    <img src={item.image} alt={item.name} className="cart-item-image" />

    <div className="cart-item-info">
      <span className="item-name"><strong>{item.name}</strong></span>
      <span className="item-price">₹{item.price}</span>
      <span className="item-qty">Qty: {item.quantity}</span>
    </div>

    <div className="cart-actions">
      <button
        className="cart-btn"
        onClick={() => {
          dispatch(decrementQuantity(item));
          toast.info(`Reduced ${item.name} quantity`);
        }}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>

      <span className="qty-num">{item.quantity}</span>

      <button
        className="cart-btn"
        onClick={() => {
          dispatch(incrementQuantity(item));
          toast.success(`Added one more ${item.name}`);
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <button
        className="delete-btn"
        onClick={() => {
          dispatch(removeCartItem(item));
          toast.error(`${item.name} removed from cart`);
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  </li>
));

  // ================= RENDER =================

  return (
    <div className="cart-container">

      {/* Headless UI Dialog */}
      <ConfirmDialog
        isOpen={dialog.isOpen}
        onClose={dialog.onClose || closeDialog}
        onConfirm={dialog.onConfirm}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
        confirmText={dialog.confirmText}
        cancelText={dialog.cancelText}
      />

      <h2 className="cart-title">
        {cartItems.length ? "My Cart" : "The Cart is empty"}
      </h2>

      <ul className="cart-list">{itemsCart}</ul>

      {cartItems.length > 0 && (
        <div>
          <p>Total Items: {allCalculations.totalItems}</p>

          <div className="discount-section">
            <div className="discount-row">
              <div className="discount-buttons">
                <button
                  className="clear-cart-btn"
                  onClick={() =>
                    openDialog({
                      title: "Clear cart?",
                      message: "All items will be removed from your cart.",
                      type: "danger",
                      confirmText: "Yes, clear it",
                      cancelText: "Cancel",
                      onConfirm: () => {
                        dispatch(clearCart());
                        toast.error("Cart cleared!");
                        closeDialog();
                      },
                      onClose: closeDialog,
                    })
                  }
                >
                  Clear Cart <FontAwesomeIcon icon={faTrashCan} />
                </button>

                <div className="coupon-container">
                  <Coupon />
                </div>
              </div>
            </div>
          </div>

          <div className="price-details">
            <h2 className="price-title">Price Details</h2>

            <p>
              <span>Total Amount:</span>
              <span>₹{allCalculations.totalAmount.toFixed(2)}</span>
            </p>
            <p>
              <span>GST ({allCalculations.gstPercentage}%):</span>
              <span>+₹{allCalculations.gstTaxAmount.toFixed(2)}</span>
            </p>
            {applied && (
              <p>
                <span>Coupon Discount ({discount}%):</span>
                <span>-₹{allCalculations.couponDiscountAmount.toFixed(2)}</span>
              </p>
            )}
            <p className="final-pay">
              <span>Amount to be Paid:</span>
              <span>₹{allCalculations.amountToBePaid.toFixed(2)}</span>
            </p>
          </div>

          <div className="razorpay-section">
            <button
              className="pay-btn"
              onClick={handleRazorpayPayment}
              disabled={processingPayment || placingOrder}
            >
              {processingPayment ? (
                <><FontAwesomeIcon icon={faSpinner} className="spin" /> Processing Payment...</>
              ) : placingOrder ? (
                <><FontAwesomeIcon icon={faSpinner} className="spin" /> Placing Order...</>
              ) : "Pay with Razorpay"}
            </button>

            <button
              className="pay-btn cod-btn"
              onClick={() => handleCheckout("COD")}
              disabled={placingOrder || processingPayment}
            >
              {placingOrder ? (
                <><FontAwesomeIcon icon={faSpinner} className="spin" /> Placing Order...</>
              ) : "Cash on Delivery"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;