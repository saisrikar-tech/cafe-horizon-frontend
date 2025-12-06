import { useState } from "react";
import AddToCart from "./AddToCart";
import "./ProductItems.css";

function Pastas() {
  const pastaItems = [
    { id: 1, name: "Penne Alfredo", price: 220, description: "Creamy white sauce pasta with herbs.", image: "penne_alfredo.jpg", isVeg: true },
    { id: 2, name: "Penne Arrabbiata", price: 210, description: "Spicy red sauce pasta with garlic and chili flakes.", image: "penne_arrabbiata.jpg", isVeg: true },
    { id: 3, name: "Cheesy White Sauce Pasta", price: 240, description: "Extra cheesy cream sauce with soft penne.", image: "white_sauce_pasta.jpg", isVeg: true },
    { id: 4, name: "Tomato Basil Pasta", price: 200, description: "Fresh basil and tangy tomato sauce.", image: "tomato_basil.jpg", isVeg: true },
    { id: 5, name: "Chicken Alfredo Pasta", price: 280, description: "Creamy alfredo pasta loaded with chicken.", image: "chicken_alfredo.jpg", isVeg: false },
    { id: 6, name: "Chicken Arrabbiata Pasta", price: 270, description: "Hot and spicy chicken pasta in red sauce.", image: "chicken_arrabbiata.jpg", isVeg: false },
    { id: 7, name: "Mushroom Alfredo Pasta", price: 250, description: "White sauce pasta topped with sautéed mushrooms.", image: "mushroom_pasta.jpg", isVeg: true },
    { id: 8, name: "Veg Macaroni Pasta", price: 180, description: "Creamy macaroni mixed with veggies.", image: "veg_macaroni.jpg", isVeg: true },
    { id: 9, name: "Spinach & Corn Pasta", price: 220, description: "Healthy spinach & sweet corn in white sauce.", image: "spinach_corn.jpg", isVeg: true },
    { id: 10, name: "Pesto Pasta", price: 260, description: "Italian basil pesto mixed with parmesan.", image: "pesto_pasta.jpg", isVeg: true },
    { id: 11, name: "Chicken Pesto Pasta", price: 290, description: "Basil pesto pasta loaded with grilled chicken.", image: "chicken_pesto.jpg", isVeg: false },
    { id: 12, name: "Lasagna (Veg)", price: 300, description: "Cheesy baked layers of pasta and vegetables.", image: "veg_lasagna.jpg", isVeg: true },
    { id: 13, name: "Lasagna (Chicken)", price: 340, description: "Chicken layers baked with rich cheese and sauce.", image: "chicken_lasagna.jpg", isVeg: false },
    { id: 14, name: "Creamy Garlic Pasta", price: 230, description: "Garlic-infused creamy pasta.", image: "garlic_pasta.jpg", isVeg: true },
    { id: 15, name: "Pink Sauce Pasta", price: 240, description: "Blend of white and red sauces — best of both worlds.", image: "pink_sauce.jpg", isVeg: true },
    { id: 16, name: "Four Cheese Pasta", price: 290, description: "Rich and creamy four-cheese blend pasta.", image: "four_cheese_pasta.jpg", isVeg: true },
    { id: 17, name: "Baked Mac & Cheese", price: 260, description: "Classic cheesy macaroni baked with a crispy top.", image: "mac_cheese.jpg", isVeg: true },
    { id: 18, name: "Italian Herb Pasta", price: 200, description: "Mixed herbs tossed in olive oil and pasta.", image: "herb_pasta.jpg", isVeg: true }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(pastaItems.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = pastaItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="item-menu-container">
      <h1>Pasta Menu</h1>

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

export default Pastas;
