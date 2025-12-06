import React from "react";
import "./Footer.css";
import { faLocationDot,faPhone,faAddressCard,faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2 className="footer-title">Café Horizon</h2>
          {/* <p className="footer-tagline">Taste Beyond the Horizon</p> */}
        </div>

        <div className="footer-section">
          <h3><FontAwesomeIcon icon={faAddressCard} />Contact</h3>
          <p><FontAwesomeIcon icon={faLocationDot} /> 123 Coffee Avenue, Hyderabad</p>
          <p><FontAwesomeIcon icon={faPhone} />  +91 95026 12978</p>
          <p><FontAwesomeIcon icon={faEnvelope} />support@cafehorizon.com</p>
        </div>

        <div className="footer-section">
          <h3>Hours</h3>
          <p>Mon-Fri: 8 AM - 10 PM</p>
          <p>Sat-Sun: 9 AM - 11 PM</p>
        </div>
         <div className="footer-section">
    <h3>Follow Us</h3>
    <p><a href="https://www.instagram.com/_ricky_ricky_03/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></p>
    <p><a href="https://www.instagram.com/_ricky_ricky_03/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /> Facebook</a></p>
    <p><a href="https://www.instagram.com/_ricky_ricky_03/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /> Twitter</a></p>
  </div>

      </div>

      <div className="footer-bottom">
        © 2025 Café Horizon — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
