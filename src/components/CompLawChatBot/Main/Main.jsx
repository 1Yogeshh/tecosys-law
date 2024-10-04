import React, { useState, useContext, useEffect } from "react";
import "../Main/Main.css";
import { assets } from "../assets/assets.js";
import { Context } from "../../../LawChatBot/context/Context.jsx";
import Popup from "../Popup/Popup.jsx";
import FormattedContent from "../../../CommonFiles/FormattedContent.jsx";
import ProfileIconDropDown from "../../../CommonFiles/ProfileIconDropdown.jsx";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import tecosysLogo from "../../CompLawChatBot/assets/tecosysLogo.png";
import { Edit, Info, QuestionAnswer, AttachMoney, ContentCopy } from "@mui/icons-material"; // Import icons
import { toast } from "react-toastify";

const Main = () => {
  const { chatHistory, setChatHistory } = useContext(Context);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [hideDefaultQuestions, setHideDefaultQuestions] = useState(false); // New state variable
  const [defaultQuestions, setDefaultQuestions] = useState([
    {
      question: "I want to know my legal Rights",
      icon: <Info />, // Blue
    },
    {
      question: "Someone stole my phone, what to do know ",
      icon: <QuestionAnswer />, // Orange
    },
    {
      question: "I want to Lodge FIR",
      icon: <Info />,
    },
    {
      question: "What services do you provide?",
      icon: <Info />,
    },
  ]);

  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory(defaultQuestions.map((q) => ({ question: q, isBot: false })));
    }
  }, [chatHistory, defaultQuestions, setChatHistory]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) {
      handleSendQuestion();
    }
  };

  const handleSendQuestion = async (question = null) => {
    const currentPrompt = question || input.trim();

    if (currentPrompt === "") return;

    setHideDefaultQuestions(true); // Hide the default questions after sending a message

    if (isEditing && editIndex !== null) {
        // Editing existing question logic
        const updatedChatHistory = chatHistory.map((msg, index) =>
            index === editIndex
                ? { ...msg, question: currentPrompt, isBot: false }
                : msg
        );
        setChatHistory(updatedChatHistory);
        setIsEditing(false); // Reset editing state
        setEditIndex(null); // Reset edit index
        setInput("");

        // Remove previous bot response if it exists
        const previousBotResponseIndex = updatedChatHistory.findIndex(
            (msg, index) => index > editIndex && msg.isBot === true
        );
        
        if (previousBotResponseIndex !== -1) {
            updatedChatHistory.splice(previousBotResponseIndex, 1);
        }
        
        setChatHistory(updatedChatHistory); // Update chat history

        // Send the updated question to the bot
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

            setChatHistory((prevChatHistory) => [
                ...prevChatHistory,
                { answer: resultData.answer || "No answer available.", isBot: true },
            ]);
        } catch (error) {
            setChatHistory((prevChatHistory) => [
                ...prevChatHistory,
                { answer: "Sorry, something went wrong. Please try again later.", isBot: true },
            ]);
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

            // Send the new question to the bot
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

                setChatHistory((prevChatHistory) => [
                    ...prevChatHistory,
                    { answer: resultData.answer || "No answer available.", isBot: true },
                ]);
            } catch (error) {
                setChatHistory((prevChatHistory) => [
                    ...prevChatHistory,
                    { answer: "Sorry, something went wrong. Please try again later.", isBot: true },
                ]);
            }
        }
    }
};

  const handleEdit = (index) => {
    setInput(chatHistory[index].question);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleQuestionClick = (question) => {
    setHideDefaultQuestions(true); // Hide the default questions after clicking a default question
    handleSendQuestion(question);
  };

  const handleCopyResponse = (response) => {
    navigator.clipboard.writeText(response)
      .then(() => {
        toast("Response copied!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="main">
      <div className="relative opacity-10">
        <img
          src={tecosysLogo}
          alt="Tecosys-Logo"
          className="absolute lg:mt-[250px] ml-[100px] mt-[250px] lg:ml-[550px] h-[100px] w-[100px]"
        />
      </div>
      <div className="absolute flex right-4 top-2 gap-2">
        <div className="h-[30px] w-[30px] border-[1px] border-gray-500 rounded-full"></div>
        <p className="font-medium">My Profile</p>
      </div>
      <div className="main-container lg:ml-[180px] ml-[10px]">
        <>
          {/* Conditionally render default questions */}
          {!hideDefaultQuestions && (
            <div className="lg:w-[600px] w-[300px] flex flex-wrap gap-4 lg:ml-[110px] ml-[60px] mt-[120px]">
              {defaultQuestions.map((item, index) => {
                // Define different border and icon colors for each question
                const colors = [
                  { iconColor: "text-red-600", borderColor: "border-red-600" },
                  { iconColor: "text-indigo-600", borderColor: "border-indigo-600" },
                  { iconColor: "text-indigo-600", borderColor: "border-indigo-600" },
                  { iconColor: "text-red-600", borderColor: "border-red-600" },
                ];

                const currentColors = colors[index % colors.length]; // Cycle through colors

                return (
                  <button
                    key={index}
                    className={`lg:w-[280px] w-[150px] h-[100px] lg:h-[150px] font-medium rounded-lg flex gap-2 justify-center items-center border-[2px] p-2 ${currentColors.borderColor}`}
                    onClick={() => handleQuestionClick(item.question)}
                  >
                    <span className={`${currentColors.iconColor}`}> {/* Apply icon color */}
                      {item.icon}
                    </span>
                    {item.question}
                  </button>
                );
              })}
            </div>
          )}

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
                  <button
                    className="right-0 flex top-1/2 transform rounded text-sm text-black opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit fontSize="30px" className="text-indigo-600 mt-1" />
                    <p className="text-sm font-medium text-gray-400">edit</p>
                  </button>
                </div>
              )}
              {history.isBot === true && (
                <div className="result-response-part">
                  <div className="botImgContainer">
                    <img className="imgClassBot" src={tecosysLogo} alt="" />
                  </div>
                  <div className="formatted-content-wrapper flex gap-2">
                    <FormattedContent text={history.answer} />
                    <button
                    className=" top-0 mt-2 flex "
                    onClick={() => handleCopyResponse(history.answer)}
                  >
                    <ContentCopy style={{height:"20px"}} />
                  </button>
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
              onClick={() => handleSendQuestion(input)}
              className="text-gray-600 hover:text-gray-800"
            >
              <SendIcon />
            </IconButton>
          </div>
          <div className="bottom-info">
            <button onClick={() => setShowPremiumPopup(true)}>{/* Save Chat on Premium */}</button>
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
