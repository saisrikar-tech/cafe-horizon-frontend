import { useState } from "react";
import AddToCart from "./AddToCart";
function MainCourse() {
    const mainCourse = [
  { id: 1, name: "Paneer Butter Masala", price: 240 },
  { id: 2, name: "Dal Tadka", price: 160 },
  { id: 3, name: "Dal Fry", price: 150 },
  { id: 4, name: "Veg Biryani", price: 180 },
  { id: 5, name: "Chicken Biryani", price: 220 },
  { id: 6, name: "Butter Chicken", price: 260 },
  { id: 7, name: "Veg Fried Rice", price: 140 },
  { id: 8, name: "Chicken Fried Rice", price: 160 },
  { id: 9, name: "Egg Fried Rice", price: 150 },
  { id: 10, name: "Veg Noodles", price: 130 },
  { id: 11, name: "Chicken Noodles", price: 160 },
  { id: 12, name: "Paneer Tikka Masala", price: 230 },
  { id: 13, name: "Mushroom Curry", price: 200 },
  { id: 14, name: "Chicken Curry", price: 240 },
  { id: 15, name: "Roti (2 pcs)", price: 20 },
  { id: 16, name: "Butter Naan", price: 35 },
  { id: 17, name: "Garlic Naan", price: 50 },
  { id: 18, name: "Jeera Rice", price: 110 }
];

  const totalmainCourseItems = mainCourse.length;
  const itemsPerPage = 8;
  const totalPages = Math.ceil(totalmainCourseItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMainCourseItems = pizzas.slice(startIndex, endIndex);
 
 const renderPizzasItems = currentMainCourseItems.map((item) => (
  <div key={item.id} className="item-card">
    <img src={item.image} alt={item.name} className="item-image" />

    <div className="item-header">
  <span className={item.isVeg ? "veg-icon" : "nonveg-icon"}></span>
  <h2 className="item-name">{item.name}</h2>
</div>

    <p className="item-description">{item.description}</p>
    <p className="item-price">Price: ₹{item.price}</p>
    <AddToCart item={item} />
  </div>
));


  return (<>
    <div className="item-menu-container">
      <h1>MainCourse Menu</h1>
      <div className="item-cards-container">
        {renderPizzasItems}
      </div>
     <div className="item-pagination">
  <button 
    onClick={() => setCurrentPage(currentPage - 1)} 
    disabled={currentPage === 1}>Previous</button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button 
      key={index} 
      onClick={() => setCurrentPage(index + 1)}
      className={currentPage === index + 1 ? "active-page" : ""}>{index + 1}</button>))}

  <button 
    onClick={() => setCurrentPage(currentPage + 1)} 
    disabled={currentPage === totalPages}>Next</button>
</div>  
    </div></>
  );
}
export default MainCourse;