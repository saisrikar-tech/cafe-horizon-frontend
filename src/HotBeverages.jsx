import { useState } from "react";
import AddToCart from "./AddToCart";
import "./ProductItems.css";

function HotBeverages() {
  const beverages = [
    { id: 201, name: "Espresso", price: 120, description: "Strong and bold single-shot coffee.", image: "espresso.jpg" },
    { id: 202, name: "Americano", price: 140, description: "Rich black coffee with hot water.", image: "americano.jpg" },
    { id: 203, name: "Latte", price: 180, description: "Smooth espresso with steamed milk.", image: "latte.jpg" },
    { id: 204, name: "Cappuccino", price: 190, description: "Espresso with foamed milk.", image: "cappuccino.jpg" },
    { id: 205, name: "Mocha", price: 210, description: "Coffee with chocolate and milk.", image: "mocha.jpg" },
    { id: 206, name: "Hot Chocolate", price: 200, description: "Creamy chocolate drink.", image: "hot_chocolate.jpg" },
    { id: 207, name: "Masala Chai", price: 80, description: "Indian spiced milk tea.", image: "masala_chai.jpg" },
    { id: 208, name: "Green Tea", price: 100, description: "Detox herbal drink.", image: "green_tea.jpg" },
    { id: 209, name: "Filter Coffee", price: 130, description: "South Indian strong decoction.", image: "filter_coffee.jpg" },
    { id: 210, name: "Caramel Latte", price: 220, description: "Latte infused with caramel.", image: "caramel_latte.jpg" }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(beverages.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = beverages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="item-menu-container">
      <h1>Hot Beverages Menu</h1>

      <div className="item-cards-container">
        {currentItems.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} className="item-image" />

            <h2>{item.name}</h2>

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

export default HotBeverages;
