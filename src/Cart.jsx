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
import { faTrashCan, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { sendOrderEmail } from "./SendOrderEmail";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Coupon from "./Coupon";
import { createPaymentOrder, verifyPayment } from "./store/PaymentSlice";

function Cart() {
  const [placingOrder, setPlacingOrder] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const { applied, discount } = useSelector((state) => state.coupon);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    if (applied) {
      toast.success(`Coupon applied 🎉 ${discount}%`);
    }
  }, [applied, discount]);

  // ================= PRICE CALCULATIONS =================

  const allCalculations = useMemo(() => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const totalItems = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

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

const handleRazorpayPayment = async () => {
  if (processingPayment) return;

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
              razorpay_signature: response.razorpay_signature
            })
          ).unwrap();
          if (verifyResult.success) {
            toast.success("Payment Verified 🎉");
            await handleCheckout();
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          toast.error("Verification failed");
        }
      },
      modal: {
        ondismiss: () => {
          console.log("Payment popup closed");
          setProcessingPayment(false);
        }
      },
      theme: {
        color: "#0f172a"
      }
    };

    const razor = new window.Razorpay(options);

razor.on("payment.failed", function (response) {
  toast.error("Payment Failed: " + response.error.description);
  setProcessingPayment(false);
  setTimeout(() => {
    // Force click the X button in Razorpay's iframe
    document.querySelector('.razorpay-backdrop')?.click();
  }, 2000);
});
    razor.open();
  } catch (error) {
    console.error(error);
    toast.error("Payment initiation failed");
  }
};
  // ================= CHECKOUT =================

  const handleCheckout = async () => {
    if (!cartItems.length) {
      toast.error("Cart is empty!");
      return;
    }

    if (!user || !user.name) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }

    const orderData = {
      orderId: Date.now(),
      customerName: user.name || "Guest",
      email: user.email || "Not Specified",
      items: cartItems,
      totalAmount: allCalculations.amountToBePaid.toFixed(2),
      paymentType: "Razorpay",
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

      Swal.fire({
        title: "Success!",
        text: `Order #${orderData.orderId} placed successfully!`,
        icon: "success",
        confirmButtonText: "Go to Orders",
        showCancelButton: true,
        cancelButtonText: "Go to Home",
      }).then((result) => {
        if (result.isConfirmed) navigate("/orders");
        else navigate("/");
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
        <span className="item-name">
          <strong>{item.name}</strong>
        </span>
        <span className="item-price">₹{item.price}</span>
        <span className="item-qty">Qty: {item.quantity}</span>
      </div>

      <div className="cart-actions">
        <button
          className="cart-btn"
          onClick={() => dispatch(decrementQuantity(item))}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>

        <span className="qty-num">{item.quantity}</span>

        <button
          className="cart-btn"
          onClick={() => dispatch(incrementQuantity(item))}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <button
          className="delete-btn"
          onClick={() => dispatch(removeCartItem(item))}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </li>
  ));

  return (
    <>
    <div className="cart-container">
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
                  onClick={() => {
                    dispatch(clearCart());
                    toast.error("🛒 Cart cleared!");
                  }}
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
                {/* Razorpay integration is currently commented out. Uncomment and add your Razorpay key to enable it. */}

                  <div className="razorpay-section">

                 <button
                    className="pay-btn"
                    onClick={handleRazorpayPayment}
                    disabled={processingPayment}
                    >

                    {processingPayment ? (
                    <>
                    <FaSpinner className="spin" /> Processing Payment...
                    </>
                    ) : (
                    "Pay with Razorpay"
                    )}

                    </button>

                  </div>
          </div>
        
      )}
    </div>
    </>
  );
}

export default Cart;