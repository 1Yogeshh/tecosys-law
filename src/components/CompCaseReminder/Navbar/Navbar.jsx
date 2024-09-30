import React, { useState } from "react";
import { Link } from "react-router-dom";
// import image from "../../assets/logo.svg";
// import cart1 from "../../assets/shopping-cart.png";
// import Cart from "../../Pages/Cart/Cart";
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
          {/* <img src={image} alt="" /> */}
          <Link to={"/"}>
            <h1>E-Drafting</h1>
          </Link>
        </div>
        <div className="menu-icons" onClick={() => setClicked((prev) => !prev)}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
          {/* <i className="fas fa-times"></i> */}
        </div>
        <div className={`nav_main ${clicked ? "ulactive" : ""}`}>
          <ul className={clicked ? "ulactive" : ""}>
            <li
              className={activeItem === 0 ? "active" : ""}
              onClick={() => handleItemClick(0)}
            >
              <Link to="/">Log In</Link>
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
