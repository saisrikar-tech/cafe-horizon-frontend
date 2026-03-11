import React, { useEffect, useState } from "react";
import "./ProductItems.css";
import AddToCart from "./AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchShakeProducts } from "./store/ShakesSlice";

function Shakes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShakeProducts()); // Fetch data when component mounts
  }, [dispatch]);

  const { shakeItems, loading, error } = useSelector(
    (state) => state.shakes                                  // Must match slice name in store.js
  );

  // Pagination Logic
  const totalShakeItems = shakeItems.length;
  const itemsPerPage = 8;
  const totalPages = Math.ceil(totalShakeItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentShakeItems = shakeItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="item-menu-container">
      <h1>Thick Shake Menu</h1>

      {loading && <p>Loading shakes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="item-cards-container">
        {currentShakeItems.map((item) => (
          <div key={item.id} className="item-card">
            <img
              src={item.image}
              alt={item.name}
              className="item-image"
            />
            <h2>{item.name}</h2>
            <p className="item-description">{item.description}</p>
            <p className="item-price">Price: ₹{item.price}</p>
            {item.discount && (
              <p className="item-discount">Discount: {item.discount}%</p>
            )}
            <AddToCart item={item} />
          </div>
        ))}
      </div>

  {/* Pagination */}
      <div className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link btn-prev">Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
            <button 
            className={`page-link btn-page ${currentPage === index + 1 ? "btn-page-active" : ""}`} 
            onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
             </li>
               ))}

<li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
  <button className="page-link btn-next">Next</button>
</li>
        </ul>
      </div>
    </div>
  );
}

export default Shakes;
