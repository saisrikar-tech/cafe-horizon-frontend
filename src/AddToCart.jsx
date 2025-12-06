import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity } from "./store/CartSlice";
import "./AddToCart.css";
import { toast } from "react-toastify";

function AddToCart({ item }) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find((cartProduct) => cartProduct.id === item.id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="add-to-cart-container">
      {cartItem ? (
        <div className="quantity-box">
          <button
            className="qty-btn-dec"
            onClick={() => {dispatch(decrementQuantity(item))
              toast.info(`➖ Reduced ${item.name} quantity`);
            }}
          >
            -
          </button>

          <span className="qty-number">{cartItem.quantity}</span>

          <button
            className="qty-btn-inc"
            onClick={() => {dispatch(incrementQuantity(item))
              toast.success(`➕ Added one more ${item.name}`);
            }}
          >
            +
          </button>
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
