import React, { useState, useContext, useRef } from "react";
import "../Main/Main.css";
import { assets } from "../assets/assets.js";
import { Context } from "../../../LawChatBot/context/Context.jsx";
import Popup from "../Popup/Popup.jsx";
import FormattedContent from "../../../CommonFiles/FormattedContent.jsx";
import ProfileIconDropDown from "../../../CommonFiles/ProfileIconDropdown.jsx";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import tecosysLogo from "../../CompLawChatBot/assets/tecosysLogo.png";
import { Edit } from "@mui/icons-material";

const Main = () => {
  const { chatHistory, setChatHistory } = useContext(Context);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false); // for Popup

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) {
      handleSendQuestion();
    }
  };

  const handleSendQuestion = async () => {
    const currentPrompt = input.trim();

    if (currentPrompt === "") return; // Prevent sending empty messages

    if (isEditing && editIndex !== null) {
      const updatedChatHistory = [...chatHistory];

      // Update the question at the edited index
      updatedChatHistory[editIndex] = { question: currentPrompt, isBot: false };

      // Remove the old bot response (which comes right after the question)
      updatedChatHistory.splice(editIndex + 1, 1);

      setChatHistory(updatedChatHistory);
      setInput("");
      setIsEditing(false);
      setEditIndex(null);

      try {
        const response = await fetch(
          "https://law-api.tecosys.ai/legal-solutions/lawchatbot/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: currentPrompt }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resultData = await response.json();

        // Only add the new bot response if it is not the same as the old one
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

        // Handle error case by updating the bot response with an error message
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
      // Normal message send flow
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
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ query: currentPrompt }),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const resultData = await response.json();

          // Add the bot response if it's not a duplicate
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
    setInput(chatHistory[index].question);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="main">
      <div className="relative opacity-10">
        <img
          src={tecosysLogo}
          alt="Tecosys-Logo"
          className="absolute top-[250px] left-[550px] h-[100px] w-[100px]"
        />
      </div>
      <div className="main-container lg:ml-[180px] ml-[10px]">
        <>
          {chatHistory.map((history, index) => (
            <div key={`${history.question}-${index}`} className="result">
              {history.isBot === false && (
                <div className="result-title relative group mb-2">
                  <img
                    className="imgClassUser"
                    src={assets.user_icon}
                    alt="user"
                  />
                  <p className="promptClass">{history.question}</p>
                  {/* Add an edit button for the user's message */}
                  <button
                    className=" right-0 flex top-1/2 transform   rounded  text-sm text-black opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit fontSize="30px" className=" text-indigo-600 mt-1"/><p className="text-sm font-medium text-gray-400">edit</p>
                  </button>
                </div>
              )}
              {history.isBot === true && (
                <div className="result-response-part">
                  <div className="botImgContainer">
                    <img className="imgClassBot" src={tecosysLogo} alt="" />
                  </div>
                  <div className="formatted-content-wrapper">
                    <FormattedContent text={history.answer} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
        <div className="main-bottom lg:w-[850px] w-[300px]">
          <div className="search-box lg:max-w-[900px] lg:w-full w-[400px] lg:mr-0 mr-[240px]">
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
      <Popup
        show={showPremiumPopup}
        onClose={() => setShowPremiumPopup(false)}
      />
    </div>
  );
};

export default Main;
