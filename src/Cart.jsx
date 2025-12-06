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
import QRCode from "react-qr-code";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Coupon from "./Coupon";

function Cart() {
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { code, applied, discount } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  const [discountPercentage, setDiscountPercentage] = useState(0);

  const user = JSON.parse(localStorage.getItem("user")) || {};

useEffect(() => {
  if (applied) {
    toast.success(`Coupon is applied 🎉 ${discount}%`);
  }
  
}, [applied, discount]);

  // ============== PRICE CALCULATIONS ==============
  const allCalculations = useMemo(() => {
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = (totalAmount * discountPercentage) / 100;
    const priceAfterDiscount = totalAmount - discountAmount;
    const couponDiscountAmount = (totalAmount * discount) / 100;
    const gstPercentage = 18;
    const gstTaxAmount = (gstPercentage / 100) * priceAfterDiscount;
    const amountToBePaid = priceAfterDiscount + gstTaxAmount - couponDiscountAmount;

    return {
      totalAmount,
      discountAmount,
      priceAfterDiscount,
      couponDiscountAmount,
      gstTaxAmount,
      amountToBePaid,
      gstPercentage,
    };
  }, [cartItems, discountPercentage, discount]);

  // ================= UPI PAYMENT ======================
  const upiID = "9502612978@ybl";
  const payerName = "KATTEKOLA SAI SRIKAR RAO";
  const paymentNote = "Payment for your order from Cafe Horizon";
  const upiLink = `upi://pay?pa=${upiID}&pn=${payerName}&am=${allCalculations.amountToBePaid}&cu=INR&tn=${paymentNote}`;

  // ================= CHECKOUT =========================
  const handleCheckout = async () => {
    if (!cartItems.length) {
      toast.error("Cart is empty!");
      return;
    }

    const orderData = {
      orderId: Date.now(),
      customerName: user.name || "Guest",
      items: cartItems,
      totalAmount: allCalculations.amountToBePaid.toFixed(2),
      paymentType: "UPI",
      status: "Pending",
      orderDate: new Date().toISOString(),
      discountPercentage,
      couponPercentage: discount,
      discountAmount: allCalculations.discountAmount.toFixed(2),
      priceAfterDiscount: allCalculations.priceAfterDiscount.toFixed(2),
      gstTaxAmount: allCalculations.gstTaxAmount.toFixed(2),
      couponDiscountAmount: allCalculations.couponDiscountAmount.toFixed(2),
      amountToBePaid: allCalculations.amountToBePaid.toFixed(2),
    };

    try {
      // Send email first
      await sendOrderEmail(cartItems, user, orderData);

      // Place order in backend/store
      await dispatch(placeOrder(orderData)).unwrap();

      // Clear cart after success
      dispatch(clearCart());
      
      Swal.fire({
        title: "Success!",
        text: "Order placed and email sent successfully!",
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
    }
  };

  // ================= CART ITEMS ========================
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
            toast.info(`➖ Reduced ${item.name} quantity`);
          }}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span className="qty-num">{item.quantity}</span>
        <button
          className="cart-btn"
          onClick={() => {
            dispatch(incrementQuantity(item));
            toast.success(`➕ Added one more ${item.name}`);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          className="delete-btn"
          onClick={() => {
            dispatch(removeCartItem(item));
            toast.warning(`🗑️ Removed ${item.name} from cart`);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </li>
  ));

  return (
    <div className="cart-container">
      <h2 className="cart-title">{cartItems.length ? "My Cart" : "The Cart is empty"}</h2>
      <ul className="cart-list">{itemsCart}</ul>

      {cartItems.length > 0 && (
        <>
          <div className="discount-section">
            <div className="discount-row">
              <h5 className="discount-title">Apply Discount manually:</h5>
              <div className="discount-buttons">
                <button className="discount-btn" onClick={() => setDiscountPercentage(10)}>10%</button>
                <button className="discount-btn" onClick={() => setDiscountPercentage(15)}>15%</button>
                <button className="discount-btn" onClick={() => setDiscountPercentage(20)}>20%</button>
                <button className="discount-btn remove" onClick={() => setDiscountPercentage(0)} disabled={discountPercentage === 0}>Remove Discount</button>
                <button className="clear-cart-btn" onClick={() => {
                  dispatch(clearCart());
                  toast.error("🛒 Cart cleared!");
                }}>
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
            <p><span>Total Amount:</span><span>₹{allCalculations.totalAmount.toFixed(2)}</span></p>
            {discountPercentage > 0 && <p><span>Discount ({discountPercentage}%):</span><span>-₹{allCalculations.discountAmount.toFixed(2)}</span></p>}
            <p><span>Price After Discount:</span><span>₹{allCalculations.priceAfterDiscount.toFixed(2)}</span></p>
            <p><span>GST ({allCalculations.gstPercentage}%):</span><span>+₹{allCalculations.gstTaxAmount.toFixed(2)}</span></p>
            {applied && <p><span>Coupon Discount ({discount}%):</span><span>-₹{allCalculations.couponDiscountAmount.toFixed(2)}</span></p>}
            <p className="final-pay"><span>Amount to be Paid:</span><span>₹{allCalculations.amountToBePaid.toFixed(2)}</span></p>
          </div>

          <div className="upi-section">
            <button className="pay-btn" onClick={() => setShowQR(true)}>UPI Scanner to Pay</button>
            {showQR && (
              <div className="payment-container">
                <h2 className="payment-title">Scan & Pay via UPI</h2>
                <h2>Amount to be paid: ₹{allCalculations.amountToBePaid.toFixed(2)}</h2>
                <div className="qr-box"><QRCode value={upiLink} size={250} /></div>
                <p className="upi-id">UPI ID: {upiID}</p>
                <button className="pay-btn" onClick={handleCheckout}>I Have Paid - Checkout</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
