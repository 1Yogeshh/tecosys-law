import React, { useState, useEffect, useContext, useRef } from "react";
import "../Main/Main.css";
import { assets } from "../assets/assets.js";
import { Context } from "../../../LawChatBot/context/Context.jsx";
import Popup from "../Popup/Popup.jsx";
import LCLogoBlack from "../assets/LCLogoBlack.png";
import FormattedContent from "../../../CommonFiles/FormattedContent.jsx";
import ProfileIconDropDown from "../../../CommonFiles/ProfileIconDropdown.jsx";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import tecosysLogo from "../../CompLawChatBot/assets/tecosysLogo.png"

const Main = () => {
  const { chatHistory, setChatHistory } = useContext(Context);

  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showPIDropdown, setShowPIDropdown] = useState(false);
  const [input, setInput] = useState("");

  const navRef = useRef(null);



  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) {
      handleSendQuestion(input);
    }
  };

  // Updated handleSendQuestion function with API integration
  const handleSendQuestion = async () => {
    const currentPrompt = input;

    // Add user's question to the chat history
    setChatHistory([
      ...chatHistory,
      { question: currentPrompt, isBot: false },
    ]);
    setInput("");

    try {
      // Send POST request to the API
      const response = await fetch(
        "https://law-api.tecosys.ai/legal-solutions/lawchatbot/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: currentPrompt }), // Send the user's query as 'query'
        }
      );

      // If response is not OK, throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const resultData = await response.json();

      // Add both user's question and bot's response to the chat history
      setChatHistory([
        ...chatHistory,
        { question: currentPrompt, isBot: false },
        { answer: resultData.answer || "No answer available.", isBot: true },
      ]);
    } catch (error) {
      console.error("Error fetching bot response:", error);

      // Add error message to chat history if API fails
      setChatHistory([
        ...chatHistory,
        { question: currentPrompt, isBot: false },
        { answer: "Sorry, something went wrong. Please try again later.", isBot: true },
      ]);
    }
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.matches(".nav-img")
      ) {
        if (showPIDropdown) {
          setShowPIDropdown(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPIDropdown]);

  const toggleDropdown = () => {
    setShowPIDropdown(!showPIDropdown);
  };

  return (
    <div className="main">
      {/* <div className="nav">
        <img
          src={assets.user_icon}
          alt="profile-img"
          onClick={toggleDropdown}
          className="nav-img"
        />
      </div> */}
      <div className="relative opacity-10 rounded-full w-[100px] h-[100px]">
        <img src={tecosysLogo} alt="Tecosys-Logo" className="absolute top-[210px] left-[550px]" />
      </div>
      <div ref={navRef}>
        <ProfileIconDropDown showProfileIconDropdown={showPIDropdown} />
      </div>
      <div className="main-container">
        <div className="greet">
          <p className="intro1">LawChatBot</p>
          <p className="intro2">Legal Issues? Ask Me!</p>
        </div>
        <>
          {chatHistory.map((history, index) => (
            <div key={`${history.question}-${index}`} className="result">
              {history.isBot === false && (
                <div className="result-title">
                  <img className="imgClassUser" src={assets.user_icon} alt="" />
                  <p className="promptClass">{history.question}</p>
                </div>
              )}
              {history.isBot === true && (
                <div className="result-response-part">
                  <div className="botImgContainer">
                    <img className="imgClassBot" src={LCLogoBlack} alt="" />
                  </div>
                  <div className="formatted-content-wrapper">
                    <FormattedContent text={history.answer} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
        <div className="main-bottom">
          <div className="search-box">
            <input
              name="input"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder="Ask Me..."
            />
            <IconButton
              onClick={handleSendQuestion}
              className="text-gray-600 hover:text-gray-800"
            >
              <SendIcon />
            </IconButton>
          </div>
          <div className="bottom-info">
            <button onClick={() => setShowPremiumPopup(true)}>
              {/* Save Chat on Premium */}
            </button>
          </div>
        </div>
      </div>
      <Popup show={showPremiumPopup} onClose={() => setShowPremiumPopup(false)} />
    </div>
  );
};

export default Main;
