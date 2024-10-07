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
  import { Edit, Info, QuestionAnswer, AttachMoney, ContentCopy, ArrowForward, Close, Delete, LegendToggle, ArrowBack, ArrowRight, ArrowLeft } from "@mui/icons-material"; // Import icons
  import { toast } from "react-toastify";

  const Main = () => {
    const { chatHistory, setChatHistory } = useContext(Context);
    const [input, setInput] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showPremiumPopup, setShowPremiumPopup] = useState(false);
    const [hideDefaultQuestions, setHideDefaultQuestions] = useState(false); // New state variable
    const [persistentHistory, setPersistentHistory] = useState([]);

    // Pagination states
     const [currentPage, setCurrentPage] = useState(0);
    const entriesPerPage = 8;


    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const toggleDrawer = () => {
      
      setIsDrawerOpen(!isDrawerOpen);
    };
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
      // Load persistent history from local storage
      const savedHistory = JSON.parse(localStorage.getItem("persistentChatHistory")) || [];
      setPersistentHistory(savedHistory);

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

      setHideDefaultQuestions(true);

      if (isEditing && editIndex !== null) {
        // Editing existing question logic
        const updatedChatHistory = chatHistory.map((msg, index) =>
          index === editIndex
            ? { ...msg, question: currentPrompt, isBot: false }
            : msg
        );

        // Remove the previous bot response if it exists
    if (editIndex < updatedChatHistory.length - 1 && updatedChatHistory[editIndex + 1].isBot) {
      updatedChatHistory.splice(editIndex + 1, 1); // Remove the bot response after the edited question
    }

        
        setChatHistory(updatedChatHistory);
        setIsEditing(false);
        setEditIndex(null);
        setInput("");

      

        // Send the updated question to the bot
        await sendToBot(currentPrompt);
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
          await sendToBot(currentPrompt);
        }
      }
    };

    const sendToBot = async (currentPrompt) => {
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

        // Update chat history and persistent history
        const newChat = { question: currentPrompt, answer: resultData.answer || "No answer available.", isBot: true };
        setChatHistory((prevChatHistory) => [...prevChatHistory, newChat]);
        
        // Update persistent history
        const updatedPersistentHistory = [...persistentHistory, newChat];
        setPersistentHistory(updatedPersistentHistory);
        localStorage.setItem("persistentChatHistory", JSON.stringify(updatedPersistentHistory));

      } catch (error) {
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { answer: "Sorry, something went wrong. Please try again later.", isBot: true },
        ]);
      }
    };

    const handleEdit = (index) => {
      setInput(chatHistory[index].question);
      setIsEditing(true);
      setEditIndex(index);
    };

    const handleQuestionClick = (question) => {
      setHideDefaultQuestions(true);
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

    const handleDeleteHistory = (index) => {
      const updatedHistory = persistentHistory.filter((_, i) => i !== index);
      setPersistentHistory(updatedHistory);
      localStorage.setItem("persistentChatHistory", JSON.stringify(updatedHistory));
    };

    // Pagination logic
  const totalEntries = persistentHistory.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const currentEntries = persistentHistory.slice(currentPage * entriesPerPage, (currentPage + 1) * entriesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
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
          <p className="font-medium hover:cursor-pointer" onClick={handleOpenModal}>My Profile</p>
        </div>

        <button
          onClick={toggleDrawer}   
          className={`p-2 hidden lg:flex  text-indigo-600 font-medium rounded-md fixed z-50 transition-transform duration-300 ${
            isDrawerOpen ? 'right-[160px]' : 'right-2'} opacity-50 hover:opacity-100`}>
          <div className="flex items-center">
          {/* Left Arrow */}
          {isDrawerOpen ? (
            <ArrowLeft className="mr- mt-1" />
          ) : (
            <ArrowRight className="mr-2 mt-1" />
          )}
          {/* Text */}
          <span>Chat History</span>
        </div>
        </button>
        <div className={`bg-white rounded p-2 absolute right-0 shadow-md transition-transform duration-300 flex flex-col justify-center items-center   ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full '}`}>
              
              <div className="flex flex-col justify-center font-medium gap-2 mt-10">
                {currentEntries.map((item, index) => (
                  <div key={index} className="flex flex-col  ">
                    <div className="flex justify-between  mb-2">
                    <div>
                      <p>> {item.question}</p>
                    </div>
                    <IconButton onClick={() => handleDeleteHistory(index)}>
                      <Delete/>
                    </IconButton>
                    </div>
                    <div className="h-[1px] w-[250px] bg-gray-300 ml-[20px]"></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className={`text-gray-500 ${currentPage === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <ArrowLeft />
            </button>
            <span className="font-medium">{`Page ${currentPage + 1} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className={`text-gray-500 ${currentPage >= totalPages - 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <ArrowRight />
            </button>
          </div>
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
        {/* Modal for Profile */}
        {isModalOpen && (
          <div className="fixed inset-0 top-0 overflow-hidden h-[1500px] bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white fixed rounded-lg p-6 max-w-lg top-44 w-full">
              <button className="absolute top-2 right-2 text-gray-500" onClick={handleCloseModal}>
                <Close/>
              </button>
              <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
              <div className="flex gap-4 items-center justify-center">
                <div className="w-[150px] h-[150px] border-[1px] border-black rounded-full"></div>
                <div className="flex flex-col gap-2">
                  <div className="flex font-medium">
                    <p>Name-</p>
                    <p>User name</p>
                  </div>
                  <div className="flex font-medium">
                    <p>Username-</p>
                    <p>User username</p>
                  </div>
                  <div>
                    <button className="flex justify-center items-center rounded font-medium bg-indigo-600 text-white w-[200px] h-[30px] mt-2">Edit Profile</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Main;
