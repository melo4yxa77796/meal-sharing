
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';  

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <ul className="footer-links">
          <li>
            <Link to="/" className="footer-link">About</Link>
          </li>
          <li>
            <Link to="/meals" className="footer-link">Meals</Link>
          </li>
          <li>
            <Link to="/contacts" className="footer-link">Contacts</Link>
          </li>
        </ul>
        <div className="footer-text">
          <p>© 2024 Meal-Sharing. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
