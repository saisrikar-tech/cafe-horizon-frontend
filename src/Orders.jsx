import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./store/OrdersSlice";
import "./Orders.css";

function Orders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.ordersList);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const visibleOrders = showAll ? orders : orders.slice(0, 5);

  // Status badge color
  const statusColor = (status) => {
    switch (status) {
      case "Delivered":  return { background: "#d4edda", color: "#155724" };
      case "Cancelled":  return { background: "#f8d7da", color: "#721c24" };
      case "Preparing":  return { background: "#cce5ff", color: "#004085" };
      default:           return { background: "#fff3cd", color: "#856404" };
    }
  };

  if (loading) return <div className="orders-container"><p>Loading orders...</p></div>;
  if (error)   return <div className="orders-container"><p>Failed to load orders. Please try again.</p></div>;

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <>
          <ul className="orders-list">
            {visibleOrders.map((order) => (
              <li key={order._id} className="order-item"> {/* ← fix key */}
                <div className="order-header">
                  <div>
                    <p><strong>Order ID:</strong> #{order.orderId}</p>
                    <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                  </div>
                  <span style={{ ...statusColor(order.status), padding: "4px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <ul className="order-items-list">
                  <li className="order-items-header">
                    <span className="item-name">Item</span>
                    <span className="item-quantity">Qty</span>
                    <span className="item-price">Price</span>
                  </li>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">{item.quantity}</span>
                      <span className="item-price">₹{item.price}</span>
                    </li>
                  ))}
                </ul>

                {/* Price breakdown */}
                <div className="order-summary">
                  <p><span>Subtotal:</span> <span>₹{Number(order.totalAmount || 0).toFixed(2)}</span></p>
                  <p><span>GST (18%):</span> <span>+₹{Number(order.gstTaxAmount || 0).toFixed(2)}</span></p>
                  {order.couponPercentage > 0 && (
                    <p><span>Coupon ({order.couponPercentage}%):</span> <span style={{ color: "#2a9d4e" }}>-₹{Number(order.couponDiscountAmount || 0).toFixed(2)}</span></p>
                  )}
                  <p className="order-total"><span>Total Paid:</span> <span>₹{Number(order.amountToBePaid || order.totalAmount || 0).toFixed(2)}</span></p>
                  <p><span>Payment:</span> <span>{order.paymentType}</span></p>
                </div>
              </li>
            ))}
          </ul>

          {orders.length > 5 && (
            <button className="toggle-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : `Show More (${orders.length - 5} more)`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Orders;