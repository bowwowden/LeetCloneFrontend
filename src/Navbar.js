// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-ul">    
     
        <li className="nav-item">
          <Link to="/problems" className="nav-button">
            Problems
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/blog" className="nav-button">
            Blog
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-button">
            Home
          </Link>
        </li>
      </ul>
    </nav>
    
  );
};

export default Navbar;
