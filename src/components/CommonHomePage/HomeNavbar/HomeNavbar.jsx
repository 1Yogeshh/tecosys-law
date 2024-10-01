import React, { useEffect, useState } from "react";
import img1 from "../assets/VectorLight.png";
// import img2 from "../assets/search.png";
import img3 from "../assets/logo.png";
import img4 from "../assets/dark.png";
import img5 from "../assets/nightsearch.png";
import img6 from "../assets/white version.png";
import { Link } from "react-router-dom";
import "./HomeNavbar.css";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Bolt, Category, ConnectWithoutContact, ContactEmergency, Home } from "@mui/icons-material";

const HomeNavbar = ({ onToggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // State to track active li

  const token = localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNightlightToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
    onToggleDarkMode(!isDarkMode); // Notify parent component about the change
  };

  const handleLiClick = (index) => {
    setActiveIndex(index); // Set active li on click
  };

  const handleCalendlyRedirect = () => {
    window.location.href = 'https://calendly.com/your-username';
  };

  return (
    <div
      className={`homenav_bar ${isScrolled ? "scrolled" : ""} ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="homenavbar_left">
        <a href="/">
          <h1>TE<span>COSYS</span>LAWS</h1>
        </a>
      </div>

      <div className="homenavbar_mid">
        <ul>
            <li>
              <a href="/"><Home style={{height:'18px'}} className="a-logo"/>Home</a>
              <a href="https://tecosys.in"><Category style={{height:'18px'}} className="a-logo"/>About us </a>
              <a><Bolt style={{height:'18px'}} className="a-logo"/>Teams</a>
              <a href="#security-section"><ConnectWithoutContact style={{height:'18px'}} className="a-logo"/>Security</a>
            </li>
        </ul>
      </div>

      <div className="homenavbar_right">
        <button className="nightlight" onClick={handleNightlightToggle}>
          {isDarkMode ? <LightModeOutlinedIcon sx={{ color : "white"}} /> : <DarkModeIcon />}
        </button>
        <button className="login1" style={{padding: "5px"}} onClick={handleCalendlyRedirect}>
          <Link style={{ color: isDarkMode ? "white" : "black", fontSize: "14px" }}>
            Book a Demo
          </Link>
        </button>
        <button className="login">
          {token?(<Link to="/casesearch" style={{ color: isDarkMode ? "#000" : "#fff" }}>
            dashboard 
          </Link>):(
            <Link to="/auth-user" style={{ color: isDarkMode ? "#000" : "#fff" }}>
            signin 
          </Link>
          )}
        </button>
      </div>
    </div>
  );
};

export default HomeNavbar;
