import { useState } from "react";
import AddToCart from "./AddToCart";
import "./ProductItems.css";

function Soups() {
  const soups = [
    { id: 1, name: "Tomato Basil Soup", price: 120, description: "Rich, creamy tomato soup infused with fresh basil.", image: "tomato_basil_soup.jpg", isVeg: true },
    { id: 2, name: "Sweet Corn Soup", price: 110, description: "Classic sweet corn soup with a smooth, comforting texture.", image: "sweet_corn_soup.jpg", isVeg: true },
    { id: 3, name: "Hot & Sour Soup", price: 130, description: "A spicy and tangy blend of veggies and Asian spices.", image: "hot_sour_soup.jpg", isVeg: true },
    { id: 4, name: "Veg Clear Soup", price: 100, description: "Light and healthy soup with fresh vegetables and herbs.", image: "veg_clear_soup.jpg", isVeg: true },
    { id: 5, name: "Manchow Soup", price: 140, description: "Thick Indo-Chinese soup topped with crispy fried noodles.", image: "manchow_soup_veg.jpg", isVeg: true },
    { id: 6, name: "Cream of Mushroom Soup", price: 150, description: "Creamy soup made with sautéed mushrooms and herbs.", image: "mushroom_soup.jpg", isVeg: true },
    { id: 7, name: "Chicken Hot & Sour Soup", price: 160, description: "A spicy, tangy chicken soup packed with bold flavors.", image: "chicken_hot_sour.jpg", isVeg: false },
    { id: 8, name: "Chicken Manchow Soup", price: 170, description: "Indo-Chinese chicken soup topped with fried noodles.", image: "chicken_manchow_soup.jpg", isVeg: false },
    { id: 9, name: "Chicken Clear Soup", price: 140, description: "Light chicken broth with herbs and shredded chicken.", image: "chicken_clear_soup.jpg", isVeg: false },
    { id: 10, name: "Broccoli & Cheese Soup", price: 160, description: "Smooth, creamy soup with blended broccoli and cheese.", image: "broccoli_cheese_soup.jpg", isVeg: true },
    { id: 11, name: "Pumpkin Cream Soup", price: 150, description: "Silky pumpkin soup with subtle spices and cream.", image: "pumpkin_soup.jpg", isVeg: true },
    { id: 12, name: "Spinach Soup", price: 130, description: "Nutritious spinach soup with a creamy earthy flavor.", image: "spinach_soup.jpg", isVeg: true },
    { id: 13, name: "Lemon Coriander Soup", price: 120, description: "Refreshing soup with a zesty lemon and coriander aroma.", image: "lemon_coriander_soup.jpg", isVeg: true },
    { id: 14, name: "Thai Coconut Soup", price: 170, description: "Aromatic Thai-style soup with coconut milk and herbs.", image: "thai_coconut_soup.jpg", isVeg: true },
    { id: 15, name: "Chicken Thai Soup", price: 190, description: "Creamy Thai chicken soup with lemongrass and coconut milk.", image: "chicken_thai_soup.jpg", isVeg: false }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(soups.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = soups.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="item-menu-container">

      <h1>Soups Menu</h1>

      {/* GRID SAME AS SHAKES */}
      <div className="item-cards-container">
        {currentItems.map((item) => (
          <div key={item.id} className="item-card">

            <img src={item.image} alt={item.name} className="item-image" />

            {/* Veg / Non-Veg Icons */}
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

export default Soups;
