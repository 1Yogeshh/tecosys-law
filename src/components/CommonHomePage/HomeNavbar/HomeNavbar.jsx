import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomeNavbar.css";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Bolt, Category, ConnectWithoutContact, Home, Menu, Close, Settings, Logout, Login } from "@mui/icons-material";
import { toast } from "react-toastify";

const HomeNavbar = ({ onToggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: ''
  });
  const token = localStorage.getItem('accessToken');
  
  

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

  const handleLogout = () => {
    // Clear the token from local storage or session storage
    localStorage.removeItem('accessToken');

    // Redirect to login page
    navigate('/auth-user');
    toast.success("Logout Successfully!")
  };

  const handleNightlightToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
    onToggleDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState); // Toggle the mobile menu visibility
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, designation } = formData;

    window.location.href = `mailto:info@tecosys.in?subject=Demo Request&body=Name: ${name}%0D%0AEmail: ${email}%0D%0ADesignation: ${designation}`;

    setIsModalOpen(false);
    toast.success("Demo request sent successfully!");
  };

  return (
    <div className={`homenav_bar ${isScrolled ? "scrolled" : ""} ${isDarkMode ? "dark" : ""}`}>
      {/* Logo */}
      <div className="homenavbar_left">
        <a href="/">
          <h1>TECOSYS <span>LAW</span></h1>
        </a>
      </div>

      <div className="flex justify-center items-center">

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="focus:outline-none p-2">
          {isMobileMenuOpen ? <Close className="text-black p-[1px]  " /> : <Menu className="text-black   p-[1px] " />}
        </button>
      </div>
      </div>

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden bg-gray-300 ml-[100px] mr-[20px] rounded-md  absolute top-14 left-0 right-0 z-50 p-4 shadow-lg">
          <ul className="flex flex-col gap-4">
            <li>
              <a className="gap-1 flex font-medium items-center" href="/"><Home style={{ height: '18px' }} className="a-logo" />Home</a>
            </li>
            <li>
              <a href="https://tecosys.in" target="_blank" className="gap-1 flex font-medium items-center"><Category style={{ height: '18px' }} className="a-logo" />About us</a>
            </li>
            <li>
              <a href="https://www.tecosys.in/teams" target="_blank" className="gap-1 flex font-medium items-center"><Bolt style={{ height: '18px' }} className="a-logo" />Teams</a>
            </li>
            <li>
              <a href="#security-section" className="gap-1 flex font-medium items-center"><ConnectWithoutContact style={{ height: '18px' }} className="a-logo" />Security</a>
            </li>
            <div className="h-[1px] w-[120px] bg-white ml-[10px]"></div>
            {token?(<>
            <li>
              <a href="#security-section" className="gap-1 flex font-medium items-center"><Settings style={{ height: '18px' }} className="a-logo" />Account Settings</a>
            </li>
            <li>
              <button onClick={handleLogout} className="gap-1 flex font-medium items-center"><Logout style={{ height: '18px' }} className="a-logo" />Logout</button>
            </li>
            </>):(
              <li>
              <a href="/auth-user" className="gap-1 flex font-medium items-center"><Login style={{ height: '18px' }} className="a-logo" />Login</a>
            </li>
            )}
            <div className="h-[1px] w-[120px] bg-white ml-[10px]"></div>
            <li>
              <button className="login1 ml-[10px]" style={{ padding: "5px" }} onClick={handleOpenModal}>
                Book a Demo
              </button>
              {isModalOpen && (
        <div className="fixed inset-0 top-0 overflow-hidden h-[1500px] bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white fixed rounded-lg p-6 max-w-lg top-44 w-full">
            <button className="absolute top-2 right-2 text-gray-500" onClick={handleCloseModal}>
              <Close />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Book a Demo</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleFormChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={handleCloseModal} className="w-3/5 py-2 border font-medium border-gray-300 rounded-md">
                  Cancel
                </button>
                <button type="submit" className="w-3/5 py-2 bg-indigo-600 font-medium text-white rounded-md">
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            </li>
            
           </ul>
        </div>
      )}

      {/* Desktop Menu (for larger screens) */}
      <div className="homenavbar_right hidden md:flex items-center gap-6">
        <ul className="flex gap-8 font-medium mr-[100px]">
            <li>
              <a href="/" className="gap-1 flex justify-center items-center nav-text" style={{ color: isDarkMode ? "white" : "black"}} ><Home style={{ height: '18px' }} className="a-logo"  />Home
              </a>
            </li>
            <li>
              <a href="https://tecosys.in" target="_blank" className="gap-1 flex justify-center nav-text items-center" style={{ color: isDarkMode ? "white" : "black"}} ><Category style={{ height: '18px' }} className="a-logo" />About us</a>
            </li>
            <li>
              <a href="https://www.tecosys.in/teams" target="_blank"  className="gap-1 flex justify-center nav-text items-center" style={{ color: isDarkMode ? "white" : "black"}} ><Bolt style={{ height: '18px' }} className="a-logo" />Teams</a>
            </li>
            <li>
              <a href="#security-section" className="gap-1 flex justify-center items-center nav-text" style={{ color: isDarkMode ? "white" : "black"}}  ><ConnectWithoutContact style={{ height: '18px'}} className="a-logo" />Security</a>
            </li>
        </ul>
        <button className="nightlight" onClick={handleNightlightToggle}>
          {isDarkMode ? <LightModeOutlinedIcon sx={{ color: "white" }} /> : <DarkModeIcon />}
        </button>

        <button className="login1" style={{ padding: "5px" }} onClick={handleOpenModal}>
          <Link style={{ color: isDarkMode ? "white" : "black", fontSize: "14px" }}>
            Book a Demo
          </Link>
        </button>
        {/* Modal for Book a Demo */}
      {isModalOpen && (
        <div className="fixed inset-0 top-0 overflow-hidden h-[1500px] bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white fixed rounded-lg p-6 max-w-lg top-44 w-full">
            <button className="absolute top-2 right-2 text-gray-500" onClick={handleCloseModal}>
              <Close />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Book a Demo</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleFormChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none"
                  required
                />
              </div>
              <div className="flex justify-between gap-2">
                <button type="button" onClick={handleCloseModal} className=" w-3/5 py-2 border border-gray-300 font-medium rounded-md">
                  Cancel
                </button>
                <button type="submit" className="w-3/5 py-2 bg-indigo-600 font-medium text-white rounded-md">
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        <button>
          {token ? (<button className="login" onClick={handleLogout}>Logout</button>) : (<Link className="login" to="/auth-user">Log In</Link>)}
        </button>
      </div>
    </div>
  );
};

export default HomeNavbar;
