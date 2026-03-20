import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-overlay" />

      <div className="home-content">
        <p className="welcome-text">Welcome to</p>
        <img src="logo-cafe.jpg" alt="Cafe Horizon Logo" className="home-logo" />
        <p className="tagline">
          Taste Beyond the Horizon — Crafted Brews & Fresh Flavours.
        </p>
        <NavLink to="/menu" className="explore-link">
          <button className="explore-btn-imp">Explore Menu</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;