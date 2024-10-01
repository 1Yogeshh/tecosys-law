import { React, useState, useEffect } from "react";
import "./HomeHero.css";
import img from "../assets/Lawcrtas logo final.png";
import img6 from "../assets/white version.png";
import { ArrowForward, AutoAwesome } from "@mui/icons-material";

const HomeHero = ({ isDarkMode }) => {
  // addting toggle feature
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

  return (
    <div className={`homehero ${isDarkMode ? "dark" : ""}`}>

      <div className="homehero_content">


        <div className="introduction">
          <div className="introduction1">
            <span><AutoAwesome style={{ height: "20px", marginTop: "5px", color: "yellow" }} /></span>

            <p>Introducing TecosysLaw <ArrowForward style={{ height: "20px", marginTop: "5px", color: "gray" }} /></p>
          </div>
        </div>

        {/* toggle section */}
        <div className="homehero_content space-y-5 flex-1 -mt-32  lg:w-[600px] w-[400px]">
          <div className="mt-32  h-[150px] flex flex-col items-center justify-start overflow-hidden whitespace-pre-wrap border border-gray-300 rounded-lg shadow-md bg-indigo-600">
            <p className="text-white font-bold text-xl lg:text-2xl tracking-wider pl-5 opacity-70">
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
        {/* <p className="heading">We Are <span>Experts</span> In</p>
        <p className="heading">We Fight For Right</p>
        <p className="content" style={{fontWeight:"500"}}>
        Simplifying the law documents with advanced AI technologies (For <span className="text-indigo-600">Lawyers</span>)<br></br>
        Know your legal rights with tecosys anytime (For <span className="text-indigo-600">Customers</span>)
        </p> */}
        {/* </div> */}
        <div className="homehero_bot">
          <a href="/casesearch" className="homehero_bot_button">Explore<ArrowForward className="explore-logo" /></a>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
