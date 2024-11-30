import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/meals" className="footer-link">
                Meals
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="footer-link">
                Get More
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-center">
          <img src="/images/meal-sharing-2-white.svg" alt="logo" />
        </div>

        <div className="footer-right">
          <ul className="footer-contacts">
            <li>
              <a href="mailto:info@mealsharing.com" className="contact-link">
                <i className="fas fa-envelope"></i> info@mealsharing.com
              </a>
            </li>
            <li>
              <a href="tel:+1234567890" className="contact-link">
                <i className="fas fa-phone"></i> +1 234 567 890
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/mealsharing"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <i className="fab fa-instagram"></i> @mealsharing
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-text">
        <p>© 2024 Meal-Sharing. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
