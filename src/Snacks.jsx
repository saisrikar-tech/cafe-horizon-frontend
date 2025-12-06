import React, { useState } from "react";
import AddToCart from "./AddToCart";
import "./ProductItems.css";

function Snacks() {
  const snacks = [
    { id: 1, name: "Classic Veg Burger", price: 120, description: "Crispy veg patty, lettuce, tomato, and creamy mayo.", image: "veg_burger.jpg", isVeg: true },
    { id: 2, name: "Cheese Veg Burger", price: 140, description: "Veg patty topped with a slice of melted cheese.", image: "cheese_veg_burger.jpg", isVeg: true },
    { id: 3, name: "Paneer Tikka Burger", price: 160, description: "Spicy paneer tikka cubes served with mint mayo.", image: "paneer_tikka_burger.jpg", isVeg: true },
    { id: 4, name: "Crispy Chicken Burger", price: 170, description: "Crispy chicken fillet with lettuce and tangy mayo.", image: "crispy_chicken_burger.jpg", isVeg: false },
    { id: 5, name: "Chicken Cheese Burger", price: 190, description: "Juicy chicken patty with melted cheese and creamy sauce.", image: "chicken_cheese_burger.jpg", isVeg: false },
    { id: 6, name: "Double Patty Burger", price: 220, description: "Two patties stacked with cheese and special sauce.", image: "double_patty_burger.jpg", isVeg: false },
    { id: 7, name: "Veg Grilled Sandwich", price: 110, description: "Grilled sandwich stuffed with veggies and spices.", image: "veg_grilled_sandwich.jpg", isVeg: true },
    { id: 8, name: "Paneer Grilled Sandwich", price: 140, description: "Grilled sandwich filled with spiced paneer cubes.", image: "paneer_grilled_sandwich.jpg", isVeg: true },
    { id: 9, name: "Cheese Corn Sandwich", price: 130, description: "Sweet corn and melted cheese grilled to perfection.", image: "cheese_corn_sandwich.jpg", isVeg: true },
    { id: 10, name: "Chicken Sandwich", price: 160, description: "Shredded chicken with pepper mayo in toasted bread.", image: "chicken_sandwich.jpg", isVeg: false },
    { id: 11, name: "Club Sandwich", price: 170, description: "Three-layer sandwich with veggies, mayo, and fries.", image: "club_sandwich.jpg", isVeg: false },
    { id: 12, name: "Egg Sandwich", price: 120, description: "Boiled eggs mixed with mayo and pepper filling.", image: "egg_sandwich.jpg", isVeg: false },
    { id: 13, name: "Peri Peri Veg Burger", price: 150, description: "Spicy peri peri–flavored veg patty with fresh veggies.", image: "peri_peri_veg_burger.jpg", isVeg: true },
    { id: 14, name: "BBQ Chicken Burger", price: 200, description: "Chicken patty coated with smoky BBQ sauce.", image: "bbq_chicken_burger.jpg", isVeg: false },
    { id: 15, name: "Masala Toast Sandwich", price: 90, description: "Spicy potato filling toasted in butter.", image: "masala_toast.jpg", isVeg: true },
    { id: 16, name: "Cheese Burst Sandwich", price: 150, description: "Loaded cheese sandwich with gooey molten cheese.", image: "cheese_burst_sandwich.jpg", isVeg: true },
    { id: 17, name: "Grilled Chicken Panini", price: 190, description: "Italian-style panini stuffed with grilled chicken.", image: "chicken_panini.jpg", isVeg: false },
    { id: 18, name: "Veg Panini", price: 160, description: "Grilled panini with veggies, olives, and cheese.", image: "veg_panini.jpg", isVeg: true }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(snacks.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = snacks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="item-menu-container">
      <h1>Snacks Menu</h1>

      <div className="item-cards-container">
        {currentItems.map((item) => (
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

export default Snacks;
