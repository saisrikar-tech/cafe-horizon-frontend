import { useState } from "react";
import AddToCart from "./AddToCart";
import "./ProductItems.css";

function Appetizers() {
  const appetizers = [
    { id: 301, name: "French Fries", price: 120, description: "Crispy golden fries served with ketchup.", image: "fries.jpg", isVeg: true },
    { id: 302, name: "Peri Peri Fries", price: 140, description: "Spicy peri-peri coated fries with a zesty dip.", image: "peri_fries.jpg", isVeg: true },
    { id: 303, name: "Cheesy Garlic Bread", price: 160, description: "Toasted baguette topped with garlic butter & melted cheese.", image: "Cheesy_Garlic_Bread.jpg", isVeg: true },
    { id: 304, name: "Veg Cheese Balls", price: 170, description: "Crunchy on the outside, gooey cheesy veg balls.", image: "Veg_Cheese_Balls.jpg", isVeg: true },
    { id: 305, name: "Chicken Popcorn", price: 180, description: "Bite-sized chicken pieces, seasoned and deep-fried.", image: "chicken_popcorn.jpg", isVeg: false },
    { id: 306, name: "Crispy Corn", price: 140, description: "Sweet corn tossed in spicy sauces and crunchy batter.", image: "Crispy_Corn.jpg", isVeg: true },
    { id: 307, name: "Paneer Tikka", price: 200, description: "Marinated paneer cubes roasted to smoky perfection.", image: "Paneer_Tikka.jpg", isVeg: true },
    { id: 308, name: "Chicken Tikka", price: 240, description: "Juicy chicken pieces marinated and char-grilled.", image: "Chicken_Tikka.jpg", isVeg: false },
    { id: 309, name: "Veg Spring Rolls", price: 130, description: "Crispy rolls stuffed with seasoned mixed vegetables.", image: "Veg_Spring_Rolls.jpg", isVeg: true },
    { id: 310, name: "Chicken Spring Rolls", price: 160, description: "Golden rolls filled with shredded chicken and veggies.", image: "Chicken_Spring_Rolls.jpg", isVeg: false },
    { id: 311, name: "Nachos with Cheese Dip", price: 180, description: "Corn nachos served with warm cheesy dip.", image: "Nachos_with_Cheese_Dip.jpg", isVeg: true },
    { id: 312, name: "Loaded Nachos", price: 220, description: "Nachos topped with beans, salsa, cheese & jalapeños.", image: "Loaded_Nachos.jpg", isVeg: true },
    { id: 313, name: "Bruschetta", price: 150, description: "Toasted bread topped with tomato, basil & olive oil.", image: "Bruschetta.jpg", isVeg: true },
    { id: 314, name: "Stuffed Mushroom Bites", price: 200, description: "Mushroom caps filled with herbed cheese and baked.", image: "Stuffed_Mushroom_Bites.jpg", isVeg: true },
    { id: 315, name: "Chicken Wings (BBQ)", price: 260, description: "Tasty wings glazed in smoky BBQ sauce.", image: "Chicken_Wings_BBQ.jpg", isVeg: false },
    { id: 316, name: "Chicken Wings (Spicy)", price: 270, description: "Hot & spicy wings with a fiery kick.", image: "Chicken_Wings_Spicy.jpg", isVeg: false },
    { id: 317, name: "Hummus with Pita Bread", price: 160, description: "Creamy hummus served with warm pita slices.", image: "Hummus_with_Pita_Bread.jpg", isVeg: true },
    { id: 318, name: "Potato Wedges", price: 130, description: "Thick potato wedges seasoned and oven-baked.", image: "Potato_Wedges.jpg", isVeg: true },
    { id: 319, name: "Veg Cutlet", price: 100, description: "Pan-fried cutlets made from spiced mashed vegetables.", image: "Veg_Cutlet.jpg", isVeg: true },
    { id: 320, name: "Honey Chilli Potato", price: 150, description: "Crispy potatoes tossed in honey and spicy sauce.", image: "Honey_Chilli_Potato.jpg", isVeg: true }
  ];

  
  const itemsPerPage = 8;
  const totalPages = Math.ceil(appetizers.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = appetizers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="item-menu-container">
      <h1>Appetizers Menu</h1>

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

export default Appetizers;