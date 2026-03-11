import React, { useEffect, useState } from "react";
import "./ProductItems.css";
import AddToCart from "./AddToCart";
import { fetchBreakfast } from "./store/BreakfastSlice";
import { useDispatch, useSelector } from "react-redux";

function Breakfast() {
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBreakfast()); // Fetch data when component mounts
  }, [dispatch]);

  const { items, loading, error } = useSelector(
    (state) => state.breakfast // Must match slice name in store.js
  );
  const breakfastItems = items;
  
  const itemsPerPage = 8;
  const totalPages = Math.ceil(breakfastItems.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBreakfastItems = breakfastItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="item-menu-container">

      <h1>Breakfast Menu</h1>
      {/*//loading status with spinner add spinner css in ProductItems.css*/}
        {loading && <div className="spinner">Loading...</div>}
      {/*//error status*/}
        {error && (
          <div className="error-message">
            Something went wrong
          </div>
        )}
      <div className="item-cards-container">
        {currentBreakfastItems.map((item) => (
          <div key={item.id} className="item-card">

            <img src={item.image} alt={item.name} className="item-image" />

            <div className="item-header">
              <span className={item.isVeg ? "veg-icon" : "nonveg-icon"}></span>
              <h2>{item.name}</h2>
            </div>

            <p className="item-description">{item.description}</p>
            <p className="item-price">Price: ₹{item.price}</p>

            <AddToCart item={item} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <ul className="pagination justify-content-center">

          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link btn-prev" onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button
                className={`page-link btn-page ${currentPage === index + 1 ? "btn-page-active" : ""}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link btn-next" onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Breakfast;
