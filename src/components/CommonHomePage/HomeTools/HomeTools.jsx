import React from "react";
import "./HomeTools.css";
import { useNavigate } from "react-router-dom";
import { FaRobot, FaSearch, FaFileSignature } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hometools = ({ isDarkMode }) => {
  const navigate = useNavigate();
  return (
    <div className={`hometools-section ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="hometools-background">
        <div className="hometools-content">
          <div className="hometools-header">
            <h3 className="header-title lg:text-4xl text-3xl md:text-2xl">What We Do</h3>
            <h2 className="header-subtitle text-2xl md:text-3xl lg:text-5xl ml-5">We Assign Tools For Clients</h2>
          </div>


          <div className="hometools-cards ">
            <div className="card2">
              <div className="card-description">
                <div className="card_description_heading">
                  
                  <div className="logo-card">
                  <FaRobot size={25} color="white" />
                  </div>
                  <p>Law ChatBot</p>
                </div>
                <div className="desc">
                <p>
                  Family and Child services lawyers play a vital role in
                  advocating for the well-being of families and children.
                </p>
                </div>
              </div>
            </div>

            <Link to={"/casesearch"}>
              <div className="card2">
                <div className="card-description">
                  <div className="card_description_heading">
                    
                    <div className="logo-card">
                    <FaSearch size={25} color="white" />
                    </div>
                    <p>Case Searching</p>
                  </div>
                  <div className="desc">
                  <p>
                    Family and Child services lawyers play a vital role in
                    advocating for the well-being of families and children.
                  </p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to={"/casesummariser"}>
              <div className="card2">
                <div className="card-description">
                  <div className="card_description_heading">
                    
                    <div className="logo-card">
                    <FaFileSignature size={25} color="white" />
                    </div>
                    <p>Case Summarizer</p>
                  </div>
                  <div className="desc">
                  <p>
                    Family and Child services lawyers play a vital role in
                    advocating for the well-being of families and children.
                  </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hometools;
