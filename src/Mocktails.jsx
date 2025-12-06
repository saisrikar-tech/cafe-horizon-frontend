import React, { useState } from "react";
import AddToCart from "./AddToCart";
import "./ProductItems.css";

function Mocktails() {
  const mocktails = [
    { id: 1, name: "Virgin Mojito", price: 140, description: "Refreshing mix of mint, lime, and soda for a perfect chill.", image: "virgin_mojito.jpg" },
    { id: 2, name: "Blue Lagoon", price: 150, description: "Cool and citrusy blue drink with a sparkling finish.", image: "blue_lagoon.jpg" },
    { id: 3, name: "Mint Cooler", price: 130, description: "Icy mint-flavored cooler with a soothing kick.", image: "mint_cooler.jpg" },
    { id: 4, name: "Strawberry Mojito", price: 160, description: "Fruity mojito blend made with fresh strawberries and mint.", image: "strawberry_mojito.jpg" },
    { id: 5, name: "Watermelon Mojito", price: 150, description: "Refreshing mojito twist with juicy watermelon.", image: "watermelon_mojito.jpg" },
    { id: 6, name: "Kiwi Cooler", price: 160, description: "Tangy kiwi blended into a chilled fizzy drink.", image: "kiwi_cooler.jpg" },
    { id: 7, name: "Lime Soda (Sweet / Salted)", price: 80, description: "Classic fizzy lime drink with your choice of sweet or salt.", image: "lime_soda.jpg" },
    { id: 8, name: "Orange Cooler", price: 120, description: "Zesty orange drink served ice cold.", image: "orange_cooler.jpg" },
    { id: 9, name: "Cranberry Cooler", price: 170, description: "Tart cranberry cooler with a sparkling twist.", image: "cranberry_cooler.jpg" },
    { id: 10, name: "Green Apple Mojito", price: 160, description: "Crisp and refreshing mojito infused with green apple flavor.", image: "green_apple_mojito.jpg" },
    { id: 11, name: "Berry Blast", price: 180, description: "Mixed berry cooler packed with fruity sweetness.", image: "berry_blast.jpg" },
    { id: 12, name: "Mango Mojito", price: 150, description: "Tropical mojito made from fresh mango and mint.", image: "mango_mojito.jpg" },
    { id: 13, name: "Pineapple Mint Cooler", price: 150, description: "Tropical pineapple blend with a minty refresh.", image: "pineapple_cooler.jpg" },
    { id: 14, name: "Classic Cold Coffee", price: 150, description: "Smooth, sweet, and chilled coffee milkshake-style.", image: "cold_coffee.jpg" },
    { id: 15, name: "Chocolate Cold Coffee", price: 170, description: "Cold coffee upgraded with a rich chocolate twist.", image: "choco_cold_coffee.jpg" },
    { id: 16, name: "Rose Milk", price: 90, description: "Cooling rose-flavored drink loved for its aroma.", image: "rose_milk.jpg" },
    { id: 17, name: "Lemon Iced Cooler", price: 130, description: "Icy sweet-and-sour lemon drink for instant refreshment.", image: "lemon_cooler.jpg" },
    { id: 18, name: "Blueberry Mojito", price: 180, description: "Mojito infused with sweet and tangy blueberries.", image: "blueberry_mojito.jpg" }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(mocktails.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = mocktails.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="item-menu-container">
      <h1>Mocktails Menu</h1>

      <div className="item-cards-container">
        {currentItems.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} className="item-image" />

            <div className="item-header">
              <h2>{item.name}</h2>
            </div>

            <p className="item-description">{item.description}</p>
            <p className="item-price">Price: ₹{item.price}</p>

            <AddToCart item={item} />
          </div>
        ))}
      </div>

      {/* PAGINATION SAME AS SHAKES */}
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

export default Mocktails;
