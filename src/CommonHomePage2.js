import React, { useState } from "react";
import HomeNavbar from "./components/CommonHomePage/HomeNavbar/HomeNavbar.jsx";
import HomeHero from "./components/CommonHomePage/HomeHero/HomeHero.jsx";
import HomeAbout from "./components/CommonHomePage/HomeAbout/HomeAbout.jsx";
import HomeTools from "./components/CommonHomePage/HomeTools/HomeTools.jsx";
import HomeTestimonial from "./components/CommonHomePage/HomeTestimonial/HomeTestimonial.jsx";
import HomeFooter from "./components/CommonHomePage/HomeFooter/HomeFooter.jsx";


const CommonHomePage2 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = (darkMode) => {
    setIsDarkMode(darkMode);
  };

  return (
    <div className={`common-homepage ${isDarkMode ? "dark" : ""}`} >
      <HomeNavbar onToggleDarkMode={handleToggleDarkMode} />
      <HomeHero isDarkMode={isDarkMode} />
      {/*<HomeAbout isDarkMode={isDarkMode} />*/}
      <HomeTools isDarkMode={isDarkMode} />
      <HomeTestimonial isDarkMode={isDarkMode} />
      <HomeFooter isDarkMode={isDarkMode} />
    </div>
  );
};

export default CommonHomePage2;
