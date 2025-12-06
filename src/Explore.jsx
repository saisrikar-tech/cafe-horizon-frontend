import React from "react";
import "./Explore.css";
import { NavLink } from "react-router-dom";

const Explore = () => {
  return (
    <div className="home-container">
      <img src="home.jpg" alt="coffee" className="home-image" />

      <div className="home-content">
        <p className="welcome-text">Welcome to</p>

        <img src="logo-cafe.jpg" alt="logo" className="home-logo" />

        <p className="tagline">
          Taste Beyond the Horizon — Crafted Brews & Fresh Flavours.
        </p>

        <NavLink to="/menu">
          <button className="explore-btn">Explore Menu</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Explore;
