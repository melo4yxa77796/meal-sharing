
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <ul className="nav-menu left-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
        </ul>

        
        <Link to="/" className="navbar-logo">
          <img src="/images/meal-sharing-2-white.svg" alt="Logo" />
        </Link>

        
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

       
        <ul className={`nav-menu right-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/meals" className="nav-links">
              Meals
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contacts" className="nav-links">
              Get More
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

