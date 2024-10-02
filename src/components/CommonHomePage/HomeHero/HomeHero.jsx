import { React, useState, useEffect } from "react";
import "./HomeHero.css";
import img from "../assets/Lawcrtas logo final.png";
import img6 from "../assets/white version.png";
import { ArrowForward, AutoAwesome } from "@mui/icons-material";

const HomeHero = ({ isDarkMode }) => {
  // Adding toggle feature
  const [selected, setSelected] = useState('lawyers');
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [showHomeTools, setShowHomeTools] = useState(false);

  const lawyersText = "Simplifying the law documents with advanced AI technologies";
  const consumersText = "Know your legal rights with tecosys anytime";

  const handleToggle = (type) => {
    setSelected(type);
    setDisplayedText('');
    setIndex(0);
  };

  const currentText = selected === 'lawyers' ? lawyersText : consumersText;

  useEffect(() => {
    if (index < currentText.split(' ').length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + ' ' + currentText.split(' ')[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [index, currentText]);

  // Getting token from local storage
  const token = localStorage.getItem('token');

  return (
    <div className={`homehero ${isDarkMode ? "dark" : ""}`}>
      <div className="homehero_content">
        <div className="introduction">
          <div className="introduction1">
            <span><AutoAwesome style={{ height: "20px", marginTop: "5px", color: "yellow" }} /></span>
            <p>Introducing TecosysLaw <ArrowForward style={{ height: "20px", marginTop: "5px", color: "gray" }} /></p>
          </div>
        </div>

        {/* Toggle section */}
        <div className="homehero_content space-y-5 flex-1 -mt-32 lg:w-[1000px] w-[300px]">
          <div className="mt-32 lg:h-[120px] h-[150px] flex flex-col items-center justify-start overflow-hidden whitespace-pre-wrap">
            <p className="text-black font-bold font-sans text-3xl lg:text-5xl tracking-wider pl-5 ">
              {displayedText}
            </p>
          </div>

          {/* Toggle button for consumers and lawyers */}
          <div className="flex justify-center items-center ">
            <div className="relative inline-flex rounded-lg shadow-md lg:mb-10 mb-5 ">
              <button
                onClick={() => handleToggle('lawyers')}
                className={`w-36 py-4 text-lg font-semibold rounded-l-lg focus:outline-none transition duration-300 ease-in-out ${selected === 'lawyers' ? 'hover:bg-indigo-600 text-black' : 'bg-gray-300 text-gray-700'}`}
              >
                For Lawyers
              </button>
              <button
                onClick={() => handleToggle('consumers')}
                className={`w-36 py-4 text-lg font-semibold rounded-r-lg focus:outline-none transition duration-300 ease-in-out ${selected === 'consumers' ? 'hover:bg-indigo-600 text-black' : 'bg-gray-300 text-gray-700'} `}
              >
                For Consumers
              </button>
            </div>
          </div>
        </div>

        {/* Conditional button based on token */}
        {token ? (
          <div className="homehero_bot">
            <a href="/casesearch" className="homehero_bot_button">Explore<ArrowForward className="explore-logo" /></a>
          </div>
        ) : (
          <div className="homehero_bot">
            <a href="/auth-user" className="homehero_bot_button">Start Now<ArrowForward className="explore-logo" /></a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeHero;
