import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import "./index.css";
function Menu() {
const menuSections = [
  { id: 1, title: "Hot Beverages", image: "hotMenu.jpg", link: "/hotBeverges" },
  { id: 2, title: "Breakfast", image: "breakfastMenu.jpg", link: "/breakfasts" },
  { id: 3, title: "Soups", image: "soupsMenu.jpg", link: "/soups" },
  { id: 5, title: "Appetizers", image: "appetizersMenu.jpg", link: "/appetizers" },
  { id: 6, title: "Cool Drinks / Mocktails", image: "mocktailsMenu.jpg", link: "/drinks" },
  { id: 7, title: "Burgers & Sandwiches", image: "burgersMenu.jpg", link: "/burgers" },
  { id: 8, title: "Pizza", image: "pizzaMenu.jpg", link: "/pizzas" },
  { id: 11, title: "Pasta", image: "shakesMenu.jpg", link: "/pastas" },
  // { id: 4, title: "Iced Beverages", image: "beveragesMenu.jpg", link: "/beverages" },
  { id: 9, title: "Desserts", image: "dessertsMenu.jpg", link: "/desserts" },
  { id: 10, title: "Shakes", image: "shakesMenu.jpg", link: "/shakes" }
];
  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Menu</h1>
      <div className="menu-grid">
        {menuSections.map((item) => (
          <Link to={item.link} className="menu-card" key={item.id}>
            <img src={item.image} alt={item.title} className="menu-img" />
            <h3 className="menu-name">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
