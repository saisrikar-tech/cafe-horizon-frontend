import { useState } from "react";
import AddToCart from "./AddToCart";
import "./ProductItems.css";

function Pizzas() {
  const pizzas = [
    { id: 1, name: "Margherita Pizza", price: 220, description: "Classic cheese and tomato with basil seasoning.", image: "margherita.jpg", isVeg: true },
    { id: 2, name: "Farm Fresh Veg Pizza", price: 260, description: "Loaded with capsicum, onions, tomatoes, and cheese.", image: "farm_veg.jpg", isVeg: true },
    { id: 3, name: "Paneer Tikka Pizza", price: 280, description: "Spicy paneer tikka topping with special masala.", image: "paneerpizza.jpg", isVeg: true },
    { id: 4, name: "Mexican Veg Pizza", price: 290, description: "Spicy jalapeños, sweet corn, olives, and cheese.", image: "mexican_veg.jpg", isVeg: true },
    { id: 5, name: "Pepperoni Pizza", price: 320, description: "Classic pepperoni slices with cheese overload.", image: "pepperoni.jpg", isVeg: false },
    { id: 6, name: "Chicken Tikka Pizza", price: 330, description: "Chicken tikka chunks with Indian spices.", image: "chicken_tikka_pizza.jpg", isVeg: false },
    { id: 7, name: "BBQ Chicken Pizza", price: 350, description: "Smoky barbecue chicken with onions and cheese.", image: "bbq_chicken.jpg", isVeg: false },
    { id: 8, name: "Veggie Supreme Pizza", price: 300, description: "Loaded with all veggies, olives, and extra cheese.", image: "veggie_supreme.jpg", isVeg: true },
    { id: 9, name: "Cheese Burst Pizza", price: 340, description: "Extra loaded cheese bursting in every bite.", image: "cheese_burst.jpg", isVeg: true },
    { id: 10, name: "Mushroom Delight Pizza", price: 260, description: "Fresh mushrooms with herbs and mozzarella.", image: "mushroom_pizza.jpg", isVeg: true },
    { id: 11, name: "Four Cheese Pizza", price: 380, description: "Blend of mozzarella, cheddar, gouda, and parmesan.", image: "four_cheese.jpg", isVeg: true },
    { id: 12, name: "Corn & Cheese Pizza", price: 240, description: "Sweet corn and mozzarella cheese combination.", image: "corn_cheese.jpg", isVeg: true },
    { id: 13, name: "Peri Peri Chicken Pizza", price: 360, description: "Fiery peri peri chicken with veggies.", image: "peri_chicken.jpg", isVeg: false },
    { id: 14, name: "Tandoori Veg Pizza", price: 290, description: "Veggies seasoned in Indian-style tandoori spices.", image: "tandoori_veg.jpg", isVeg: true },
    { id: 15, name: "Spinach Alfredo Pizza", price: 310, description: "Creamy spinach alfredo base with cheese.", image: "spinach_pizza.jpg", isVeg: true },
    { id: 16, name: "Hawaiian Pizza", price: 330, description: "Pineapple, chicken, and cheese — a sweet-savory mix.", image: "hawaiian.jpg", isVeg: false },
    { id: 17, name: "Italian Veg Pizza", price: 280, description: "Fresh tomatoes, olives, herbs, and mozzarella.", image: "italian_veg.jpg", isVeg: true },
    { id: 18, name: "Classic Cheese Pizza", price: 210, description: "Simple & delicious cheesy goodness.", image: "classic_cheese.jpg", isVeg: true }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(pizzas.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = pizzas.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="item-menu-container">
      <h1>Pizza Menu</h1>

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

export default Pizzas;
