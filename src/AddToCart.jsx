import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity } from "./store/CartSlice";
import "./AddToCart.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddToCart({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItem = useSelector((state) =>
    state.cart.items.find((cartProduct) => cartProduct.id === item.id)
  );

  // Check if user is logged in
  const isUserLoggedIn = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user && user.name;
  };

  const handleAddToCart = () => {
    if (!isUserLoggedIn()) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add items to cart",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };

  const handleIncrement = () => {
    if (!isUserLoggedIn()) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to update cart",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    dispatch(incrementQuantity(item));
    toast.success(`➕ Added one more ${item.name}`);
  };

  const handleDecrement = () => {
    if (!isUserLoggedIn()) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to update cart",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    dispatch(decrementQuantity(item));
    toast.info(`➖ Reduced ${item.name} quantity`);
  };

  return (
    <div className="add-to-cart-container">
      {cartItem ? (
        <div className="quantity-box">
          <button className="qty-btn-dec" onClick={handleDecrement}>-</button>
          <span className="qty-number">{cartItem.quantity}</span>
          <button className="qty-btn-inc" onClick={handleIncrement}>+</button>
        </div>
      ) : (
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add To Cart
        </button>
      )}
    </div>
  );
}

export default AddToCart;