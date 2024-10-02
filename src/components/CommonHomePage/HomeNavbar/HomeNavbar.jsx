import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeNavbar.css";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Bolt, Category, ConnectWithoutContact, Home, Menu, Close } from "@mui/icons-material";

const HomeNavbar = ({ onToggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    onToggleDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState); // Toggle the mobile menu visibility
  };

  const handleCalendlyRedirect = () => {
    window.location.href = 'https://calendly.com/your-username';
  };

  return (
    <div className={`homenav_bar ${isScrolled ? "scrolled" : ""} ${isDarkMode ? "dark" : ""}`}>
      {/* Logo */}
      <div className="homenavbar_left">
        <a href="/">
          <h1>TE<span>COSYS</span>LAWS</h1>
        </a>
      </div>

      <div className="flex justify-center items-center">
      <button className="md:hidden bg-indigo-600 text-white p-1 rounded  ml-[60px] h-[30px] flex justify-center items-center">
          {token ? (<Link to="/casesearch">Dashboard</Link>) : (<Link to="/auth-user">Log In</Link>)}
      </button>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="focus:outline-none p-2">
          {isMobileMenuOpen ? <Close className="text-black p-[1px]  " /> : <Menu className="text-black   p-[1px] " />}
        </button>
      </div>
      </div>

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="mobile-menu bg-gray-300 ml-[100px] mr-[20px] rounded-md  absolute top-14 left-0 right-0 z-50 p-4 shadow-lg">
          <ul className="flex flex-col gap-4">
            <li>
              <a className="gap-1 flex font-medium items-center" href="/"><Home style={{ height: '18px' }} className="a-logo" />Home</a>
            </li>
            <li>
              <a href="https://tecosys.in" className="gap-1 flex font-medium items-center"><Category style={{ height: '18px' }} className="a-logo" />About us</a>
            </li>
            <li>
              <a className="gap-1 flex font-medium items-center"><Bolt style={{ height: '18px' }} className="a-logo" />Teams</a>
            </li>
            <li>
              <a href="#security-section" className="gap-1 flex font-medium items-center"><ConnectWithoutContact style={{ height: '18px' }} className="a-logo" />Security</a>
            </li>
            <li>
              <button className="login1 ml-[12px]" style={{ padding: "5px" }} onClick={handleCalendlyRedirect}>
                Book a Demo
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Desktop Menu (for larger screens) */}
      <div className="homenavbar_right hidden md:flex items-center gap-6">
        <ul className="flex gap-8 font-medium mr-[100px]">
            <li>
              <a href="/" className="gap-1 flex justify-center items-center"><Home style={{ height: '18px' }} className="a-logo" />Home</a>
            </li>
            <li>
              <a href="https://tecosys.in" className="gap-1 flex justify-center items-center"><Category style={{ height: '18px' }} className="a-logo" />About us</a>
            </li>
            <li>
              <a className="gap-1 flex justify-center items-center"><Bolt style={{ height: '18px' }} className="a-logo" />Teams</a>
            </li>
            <li>
              <a href="#security-section" className="gap-1 flex justify-center items-center"><ConnectWithoutContact style={{ height: '18px' }} className="a-logo" />Security</a>
            </li>
        </ul>
        <button className="nightlight" onClick={handleNightlightToggle}>
          {isDarkMode ? <LightModeOutlinedIcon sx={{ color: "white" }} /> : <DarkModeIcon />}
        </button>

        <button className="login1" style={{ padding: "5px" }} onClick={handleCalendlyRedirect}>
          <Link style={{ color: isDarkMode ? "white" : "black", fontSize: "14px" }}>
            Book a Demo
          </Link>
        </button>
        <button className="login">
          {token ? (<Link to="/casesearch">Dashboard</Link>) : (<Link to="/auth-user">Log In</Link>)}
        </button>
      </div>
    </div>
  );
};

export default HomeNavbar;
