import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <div className="navbar">
      <div className="nav_items">
        <div className="logo">
          <Link to={"/"}>
            <h1>E-Drafting</h1>
          </Link>
        </div>
        <div  onClick={() => setClicked((prev) => !prev)}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <div className={`nav_main ${clicked ? "ulactive" : ""}`}>
          <ul className={clicked ? "ulactive" : ""}>
            <li
              className={activeItem === 0 ? "active" : ""}
              onClick={() => handleItemClick(0)}
            >
              <Link to="/" className="transition-all duration-500">Log In</Link>
            </li>
            <li
              className={activeItem === 1 ? "active" : ""}
              onClick={() => handleItemClick(1)}
            >
              <Link to={"/gemstone"}>Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
