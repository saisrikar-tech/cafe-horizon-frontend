import React, { useState } from "react";
import "./ProductItems.css";
import AddToCart from "./AddToCart";

function Breakfast() {
  const breakfastItems = [
    { id: 201, name: "Classic Omelette", price: 120, description: "Fluffy 3-egg omelette cooked with herbs and butter.", image: "omelette.jpg", isVeg: false },
    { id: 202, name: "Veg Masala Sandwich", price: 90, description: "Toasted sandwich stuffed with spiced mashed potatoes and veggies.", image: "veg-masala-sandwich.jpg", isVeg: true },
    { id: 203, name: "Grilled Cheese Toast", price: 110, description: "Golden grilled sandwich loaded with melted cheese.", image: "cheese-toast.jpg", isVeg: true },
    { id: 204, name: "Aloo Paratha", price: 140, description: "Whole wheat paratha stuffed with spicy mashed potatoes.", image: "aloo-paratha.jpg", isVeg: true },
    { id: 205, name: "Paneer Paratha", price: 160, description: "Soft paratha filled with crumbled paneer and mild spices.", image: "paneer-paratha.jpg", isVeg: true },
    { id: 211, name: "Cornflakes with Milk", price: 60, description: "Classic breakfast bowl with chilled milk.", image: "cornflakes.jpg", isVeg: true },
    { id: 212, name: "Pancakes with Maple Syrup", price: 170, description: "Soft fluffy pancakes served with sweet maple syrup.", image: "pancakes.jpg", isVeg: true },
    { id: 213, name: "French Toast", price: 150, description: "Egg-coated bread slices fried until golden and served sweet.", image: "french-toast.jpg", isVeg: false },
    { id: 214, name: "Scrambled Eggs", price: 110, description: "Soft creamy scrambled eggs cooked with butter and pepper.", image: "scrambled-eggs.jpg", isVeg: false },
    { id: 215, name: "Banana Oats Bowl", price: 130, description: "Warm oats topped with banana slices and honey.", image: "oats-bowl.jpg", isVeg: true }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(breakfastItems.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBreakfastItems = breakfastItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="item-menu-container">

      <h1>Breakfast Menu</h1>

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
