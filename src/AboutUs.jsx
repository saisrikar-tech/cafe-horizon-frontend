import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <>
      <div className="about-us">
        <div className="about-us-content">
          <div className="about-us-text">
            <h2>About Us</h2>
            <p>
              Welcome to <strong>Fine Dine Restro</strong>, where we serve the finest vegetarian dishes made from fresh, local ingredients. Our goal is to provide an exceptional dining experience with mouthwatering dishes that cater to every vegetarian's taste.
            </p>
            <p>
              From the traditional flavors of Indian spices to contemporary vegetarian creations, we offer a variety of dishes that are perfect for every occasion. Whether you're here for a family dinner or a quick lunch, our menu is designed to delight your taste buds and keep you coming back for more.
            </p>
            <p>
              Join us at <strong>Fine Dine Restro</strong> for a wholesome, delicious meal, and experience the true taste of vegetarian cuisine in a warm, welcoming environment.
            </p>
          </div>

          <div className="about-us-image">
            <img src="Aboutus.jpg" alt="Restaurant Interior" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
