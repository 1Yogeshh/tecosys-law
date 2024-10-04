import React, { useState, useEffect, useContext, useRef } from "react";
import "../Main/Main.css";
import { assets } from "../assets/assets.js";
import { Context } from "../../../LawChatBot/context/Context.jsx";
import Popup from "../Popup/Popup.jsx";
import FormattedContent from "../../../CommonFiles/FormattedContent.jsx";
import ProfileIconDropDown from "../../../CommonFiles/ProfileIconDropdown.jsx";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import tecosysLogo from "../../CompLawChatBot/assets/tecosysLogo.png";

const Main = () => {
  const { chatHistory, setChatHistory } = useContext(Context);

  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showPIDropdown, setShowPIDropdown] = useState(false);
  const [input, setInput] = useState(""); // Input value
  const [selectedBox, setSelectedBox] = useState(null); // Track the selected box
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const navRef = useRef(null);

  // Handle box click and pass predefined queries
  const handleBoxesClick = (boxText, query) => {
    setSelectedBox(boxText); // Update the selected box
    setInput(query); // Set the input value to the box's query
    handleSendQuestion(query); // Send the query for the response
  };

  // Handle key down (Enter key)
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) {
      handleSendQuestion(input); // Send the input value when Enter is pressed
    }
  };

  const handleSendQuestion = async (query) => {
    const currentPrompt = query || input; // Use the query or the input value

    if (!currentPrompt.trim()) return; // Prevent sending an empty input

    if (isEditing && editIndex !== null) {
      const updatedChatHistory = [...chatHistory];
      updatedChatHistory[editIndex] = { question: currentPrompt, isBot: false };
      updatedChatHistory.splice(editIndex + 1, 1); 
      setChatHistory(updatedChatHistory);
      setInput(""); // Clear input field
      setIsEditing(false); // Exit edit mode
      setEditIndex(null); // Reset edit index

      try {
        const response = await fetch(
          "https://law-api.tecosys.ai/legal-solutions/lawchatbot/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: currentPrompt }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resultData = await response.json();

        setChatHistory((prevChatHistory) => {
          const updatedHistory = [...prevChatHistory];
          updatedHistory.splice(editIndex + 1, 0, {
            answer: resultData.answer || "No answer available.",
            isBot: true,
          });
          return updatedHistory;
        });
      } catch (error) {
        console.error("Error fetching bot response:", error);
        setChatHistory((prevChatHistory) => {
          const updatedHistory = [...prevChatHistory];
          updatedHistory.splice(editIndex + 1, 0, {
            answer: "Sorry, something went wrong. Please try again later.",
            isBot: true,
          });
          return updatedHistory;
        });
      }
    } else {
      const existingUserMessage = chatHistory.find(
        (msg) => msg.question === currentPrompt && msg.isBot === false
      );

      if (!existingUserMessage) {
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { question: currentPrompt, isBot: false },
        ]);
        setInput("");

        try {
          const response = await fetch(
            "https://law-api.tecosys.ai/legal-solutions/lawchatbot/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ query: currentPrompt }),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const resultData = await response.json();

          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { answer: resultData.answer || "No answer available.", isBot: true },
          ]);
        } catch (error) {
          console.error("Error fetching bot response:", error);
          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { answer: "Sorry, something went wrong. Please try again later.", isBot: true },
          ]);
        }
      }
    }
  };

  // Enable edit mode for a specific message
  const handleEdit = (index) => {
    setInput(chatHistory[index].question); // Set input to the question being edited
    setIsEditing(true); // Enable edit mode
    setEditIndex(index); // Set the index of the question being edited
  };

  // Handle clicks outside the profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowPIDropdown(false); // Hide profile dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPIDropdown]);

  const toggleDropdown = () => {
    setShowPIDropdown(!showPIDropdown); // Toggle the profile icon dropdown
  };

  return (
    <div className="main">
      {/* Profile icon */}
      <div className="relative w-[100px] h-[100px] rounded-full">
        <img src={tecosysLogo} alt="Tecosys-Logo" className="absolute top-[210px] left-[550px]" />
      </div>

      <div ref={navRef}>
        <ProfileIconDropDown showProfileIconDropdown={showPIDropdown} />
      </div>

      {/* Display boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 my-6">
        {!selectedBox && (
          <>
            {/* Box 1 */}
            <div
              className="px-1 py-10 bg-indigo-600 text-white rounded-lg cursor-pointer opacity-50 w-[240px]"
              onClick={() =>
                handleBoxesClick("I want to know my legal rights", "I want to know my legal rights")
              }
            >
              I want to know my legal rights
            </div>

            {/* Box 2 */}
            <div
              className="px-1 py-10 bg-indigo-600 text-white rounded-lg cursor-pointer opacity-50 w-[320px] ml-[-90px]"
              onClick={() =>
                handleBoxesClick(
                  "Someone stole my phone, what to do now?",
                  "Someone stole my phone, what to do now?"
                )
              }
            >
              Someone stole my phone, what to do now?
            </div>

            {/* Box 3 */}
            <div
              className="px-1 py-10 bg-indigo-600 text-white rounded-lg cursor-pointer shadow-md opacity-50 w-[240px] ml-[-100px]"
              onClick={() => handleBoxesClick("I want to Lodge FIR", "I want to Lodge FIR")}
            >
              I want to Lodge FIR
            </div>
          </>
        )}

        {/* Selected box message */}
        {selectedBox && (
          <div className="px-1 py-10 bg-indigo-600 text-white rounded-lg">
            {selectedBox}
          </div>
        )}
      </div>

      {/* Chat history */}
      <div className="main-container lg:ml-[180px] ml-[10px]">
        {chatHistory.map((history, index) => (
          <div key={`${history.question}-${index}`} className="result">
            {/* User's question */}
            {history.isBot === false && (
              <div className="result-title relative group mb-2">
                <img className="imgClassUser" src={assets.user_icon} alt="user" />
                <p className="promptClass">{history.question}</p>
                <button
                  className="right-0 flex top-1/2 transform rounded text-sm text-black opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleEdit(index)}
                >
                  <SendIcon fontSize="30px" className="text-indigo-600 mt-1" />
                  <p className="text-sm font-medium text-gray-400">edit</p>
                </button>
              </div>
            )}

            {/* Bot's response */}
            {history.isBot === true && (
              <div className="result-response-part">
                <div className="botImgContainer">
                  <img className="imgClassBot" src={tecosysLogo} alt="" width={30} height={30} />
                </div>
                <div className="formatted-content-wrapper">
                  <FormattedContent text={history.answer} />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Input box and send button */}
        <div className="main-bottom lg:w-[850px] w-[300px]">
          <div className="search-box lg:max-w-[900px] lg:w-full w-[400px] lg:mr-0 mr-[240px]">
            <input
              name="input"
              onChange={(event) => setInput(event.target.value)} // Update input value
              onKeyDown={handleKeyDown} // Send on Enter key press
              value={input}
              type="text"
              placeholder="Ask Me..."
              className="border-5 border-solid focus:border-indigo-600 focus:ring-0 outline-none p-2 rounded-md"
            />
            <IconButton
              onClick={() => handleSendQuestion(input)} // Send on button click
              className="text-gray-600 hover:text-gray-800"
            >
              <SendIcon />
            </IconButton>
          </div>
          <div className="bottom-info">
            <button onClick={() => setShowPremiumPopup(true)}>Save Chat on Premium</button>
          </div>
        </div>
      </div>

      {/* Popup for premium */}
      <Popup show={showPremiumPopup} onClose={() => setShowPremiumPopup(false)} />
    </div>
  );
};

export default Main;
