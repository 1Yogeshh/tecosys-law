import { React, useState, useEffect } from "react";
import "./HomeHero.css";
import { ArrowForward, AutoAwesome } from "@mui/icons-material";

const HomeHero = ({ isDarkMode }) => {
  const [selected, setSelected] = useState("lawyers");
  const [displayedText, setDisplayedText] = useState([]);
  const [index, setIndex] = useState(0);

  const lawyersText = "Simplifying the Law Documents with Advanced AI Technologies";
  const consumersText = "Know Your Legal Rights with Tecosys Anytime";

  const handleToggle = (type) => {
    setSelected(type);
    setDisplayedText([]);
    setIndex(0);
  };

  const currentText = selected === "lawyers" ? lawyersText : consumersText;

  useEffect(() => {
    if (index < currentText.split(" ").length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => [...prev, currentText.split(" ")[index]]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [index, currentText]);

  // Getting token from local storage
  const token = localStorage.getItem("token");

  return (
    <div className={`homehero ${isDarkMode ? "dark" : ""}`}>
      <div className="homehero_content">
        <div className="introduction">
          <div className="introduction1 pl-1 pr-1 w-auto flex items-center space-x-3">
            <span>
              <AutoAwesome style={{ height: "20px", color: "#FDE047" }} />
            </span>
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Introducing TecosysLaw{" "}
              <ArrowForward style={{ height: "20px", color: "gray" }} />
            </p>
          </div>
        </div>

        {/* Toggle section */}
 <div className="homehero_content space-y-3 flex-1 lg:w-[600px] w-[200px] mt-2">
           <div className="lg:h-[110px] h-auto flex flex-col items-center justify-start overflow-hidden whitespace-pre-wrap ">
            <p className="text-black font-bold font-sans text-3xl lg:w-[900px] w-[350px] lg:text-5xl tracking-wider fade-in-text" style={{ color: isDarkMode ? 'white' : 'black' }}>
             {displayedText.map((word, idx) => {
                if (
                   (selected === "lawyers" && (word === "AI" || word === "Technologies")) ||
                (selected === "consumers" && word.toLowerCase() === "tecosys")
         ) {
                 return (
                     <span key={idx} className="text-indigo-600 font-serif">
                  {word}{" "}
                   </span>
               );
                }
                return <span key={idx}>{word}{" "}</span>;
              })}
            </p>
          </div>

          {/* Added descriptive paragraph */}
          <p className=" text-gray-500 md:w-[1000px] w-[350px] text-[18px] flex  text-center ">
          At Tecosys Law, we want to empower our lawyers and consumers with cutting-edge AI technology, providing a secure platform to streamline all legal documents and information. Let's explore our services...
          </p>

          {/* Toggle button for consumers and lawyers */}
          <div className="flex justify-center items-center">
            <div className="flex gap-4 lg:mb-10 mb-5 mt-4">
              <button
                onClick={() => handleToggle("lawyers")}
                className={`py-3 px-6 text-[16px] font-medium rounded-l-lg font-sans transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-100  ${
                  selected === "lawyers" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                For Lawyers
              </button>
              <p className="text-gray-500 dark:text-gray-300 mt-4">|</p>
              <button
                onClick={() => handleToggle("consumers")}
                className={`py-3 px-6 text-[16px] font-medium rounded-r-lg font-sans transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-100  ${
                  selected === "consumers" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                For Consumers
              </button>
            </div>
          </div>
        </div>

        {/* Conditional button based on token */}
        <div className="">
          {token ? (
            <div className="homehero_bot flex justify-center">
              <a href="/casesearch" className="homehero_bot_button py-3 px-8 bg-indigo-600 text-white rounded-full transition hover:bg-indigo-700 hover:shadow-lg focus:ring-4 focus:ring-indigo-200 flex items-center">
                Explore
                <ArrowForward className="ml-2 explore-logo" />
              </a>
            </div>
          ) : (
            <div className="homehero_bot flex justify-center">
              <a href="/auth-user" className="homehero_bot_button py-3 px-8 bg-indigo-600 text-white rounded-full transition hover:bg-indigo-700 hover:shadow-lg focus:ring-4 focus:ring-indigo-200 flex items-center">
                Start Now
                <ArrowForward className="ml-2 explore-logo" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
