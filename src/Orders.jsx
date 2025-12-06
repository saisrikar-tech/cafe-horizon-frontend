import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./store/OrdersSlice";
import "./Orders.css";

function Orders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.ordersList);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const visibleOrders = showAll ? orders : orders.slice(0, 5);

  return (
    <div className="orders-container">
      <h2 className="orders-title">All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <ul className="orders-list">
            {visibleOrders.map((order) => (
              <li key={order.orderDate} className="order-item">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Discount:</strong> {order.discountPercentage}%</p>
                <p><strong>Coupon:</strong> {order.couponPercentage}%</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                
                <ul className="order-items-list">
                  <li className="order-items-header">
                    <span className="item-name">Item Name</span>
                    <span className="item-quantity">Quantity</span>
                    <span className="item-price">Price</span>
                  </li>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">{item.quantity}</span>
                      <span className="item-price">₹{item.price}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {orders.length > 5 && (
            <button
              className="toggle-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Orders;
