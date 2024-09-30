import React from "react";
import "./HomeHero.css";
import img from "../assets/Lawcrtas logo final.png";
import img6 from "../assets/white version.png";
import { ArrowForward, AutoAwesome } from "@mui/icons-material";

const HomeHero = ({ isDarkMode }) => {
  const token = localStorage.getItem('token');
  return (
    <div className={`homehero ${isDarkMode ? "dark" : ""}`}>

      <div className="homehero_content">
        <div className="introduction">
          <div className="introduction1">
          <span><AutoAwesome style={{height:"20px", marginTop:"5px", color:"yellow"}}/></span>
          
          <p>Introducing Tecosys <ArrowForward style={{height:"20px", marginTop:"5px",color:"gray"}}/></p>
          </div>
        </div>
        <p className="heading">We Are <span>Experts</span> In</p>
        <p className="heading">We Fight For Right</p>
        <p className="content" style={{fontWeight:"500"}}>
        Simplifying the law documents with advanced AI technologies (For <span className="text-indigo-600">Lawyers</span>)<br></br>
        Know your legal rights with tecosys anytime (For <span className="text-indigo-600">Customers</span>)
        </p>
      </div>
      {token?(
        <div className="homehero_bot">
        <a href="/casesearch" className="homehero_bot_button">Explore<ArrowForward className="explore-logo"/></a>
      </div>
      ):(
        <div className="homehero_bot">
        <a href="/auth-user" className="homehero_bot_button">Start Now<ArrowForward className="explore-logo"/></a>
      </div>
      )}
    </div>
  );
};

export default HomeHero;
