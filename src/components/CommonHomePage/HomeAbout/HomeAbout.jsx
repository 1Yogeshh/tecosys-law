import React from "react";
import { FaGavel, FaThumbsUp, FaTools } from "react-icons/fa";
import "./HomeAbout.css";

const HomeAbout = ({ isDarkMode }) => {
  return (
    <div className={`about-section ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="about-section-first">
        <div className="about-section-first-logo">
          <FaGavel size={25} color="white" />
        </div>
        <div className="about-section-first-title">
          <p>Highly ethical standard</p>
        </div>
        <div className="about-section-first-disc">
          <p>In the legal profession, upholding the highest ethical standards is paramount to maintaining the integrity of the justice system and ensuring public trust.</p>
        </div>
      </div>

      <div className="about-section-first">
        <div className="about-section-first-logo">
          <FaThumbsUp size={25} color="white" />
        </div>
        <div className="about-section-first-title">
          <p>Highly Recommend</p>
        </div>
        <div className="about-section-first-disc">
          <p>When seeking legal representation, finding a lawyer who stands out in their field can make a world of difference, and certain qualities make some attorneys highly recommendable.</p>
        </div>
      </div>

      <div className="about-section-first">
        <div className="about-section-first-logo">
          <FaTools size={25} color="white" />
        </div>
        <div className="about-section-first-title">
          <p>Specialized AI Tools</p>
        </div>
        <div className="about-section-first-disc">
          <p>When navigating complex legal issues, hiring a specialized lawyer can be crucial for achieving the best possible outcome.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
