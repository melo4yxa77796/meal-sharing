import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="" alt="Logo" />
        </Link>

        <ul className="nav-menu">
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
            <Link to="/reviews" className="nav-links">
              Reviews
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
