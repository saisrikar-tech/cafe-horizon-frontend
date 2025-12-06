import React from "react";
import "./ProductItems.css";
import AddToCart from "./AddToCart";
import { useState } from "react";

import { useDispatch } from "react-redux";
// import { addToCart } from "./store";

function Desserts() {
  const dessertItems = [
    { id: 300, name: "Gulab Jamun", price: 120, discount: "5% off on first order", description: "Soft fried dumplings soaked in sugar syrup.", image: "des1.jpeg" },
    { id: 301, name: "Rasmalai", price: 150, discount: "10% off on orders above ₹400", description: "Creamy flattened paneer discs soaked in flavored milk.", image: "des2.jpeg" },
    { id: 302, name: "Brownie", price: 180, discount: "No discount available", description: "Rich chocolate brownie served warm.", image: "Dessert3.jpeg" },
    { id: 303, name: "Ice Cream Sundae", price: 160, discount: "Buy 1 Get 1 Free", description: "Vanilla ice cream topped with nuts and chocolate syrup.", image: "Dessert4.jpeg" },
    { id: 304, name: "Cheesecake", price: 220, discount: "5% off on weekends", description: "Creamy New York–style cheesecake.", image: "Dessert5.jpeg" },
    { id: 305, name: "Fruit Salad", price: 140, discount: "No discount available", description: "Fresh mixed fruits served with honey.", image: "Dessert6.jpeg" },
    { id: 306, name: "Kheer", price: 110, discount: "10% off on orders above ₹300", description: "Traditional rice pudding with dry fruits.", image: "Dessert7.jpeg" },
    { id: 307, name: "Cupcake", price: 90, discount: "5% off on first order", description: "Soft and fluffy cupcake with creamy frosting.", image: "Dessert8.jpeg" },
    { id: 308, name: "Chocolate Lava Cake", price: 200, discount: "15% off on weekends", description: "Molten chocolate-filled cake served hot.", image: "Dessert9.jpeg" },
    { id: 309, name: "Apple Pie", price: 180, discount: "No discount available", description: "Classic pie with cinnamon-spiced apple filling.", image: "Dessert10.jpeg" },
  ];
    const totalDessertItems = dessertItems.length;
    const itemsPerPage = 8;
    const totalPages = Math.ceil(totalDessertItems / itemsPerPage);
  
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDessertItems = dessertItems.slice(startIndex, endIndex);
    const dispatch = useDispatch();

  
  const renderDessertItems = currentDessertItems.map((item) => (
    <div key={item.id} className="item-card">
      <img src={item.image} alt={item.name} className="item-image" />
      <h2>{item.name}</h2>
      <p className="item-description">{item.description}</p>
      <p className="item-price">Price: ₹{item.price}</p>
      <p className="item-discount">{item.discount}</p>
      <AddToCart item={item} />
    </div>
  ));

  return (<>
    <div className="item-menu-container">
      <h1>Desserts Menu</h1>
      <div className="item-cards-container">
        {renderDessertItems}
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
    </div></>
  );
};

export default Desserts;
