// import React, { useState, useEffect, useContext, useRef } from "react";
// import "../Main/Main.css";
// import { assets } from "../assets/assets.js";
// import { Context } from "../../../LawChatBot/context/Context.jsx";
// import Popup from "../Popup/Popup.jsx";
// import LCLogoBlack from "../assets/LCLogoBlack.png";
// import FormattedContent from "../../../CommonFiles/FormattedContent.jsx";
// import ProfileIconDropDown from "../../../CommonFiles/ProfileIconDropdown.jsx";
// import SendIcon from "@mui/icons-material/Send";
// import IconButton from "@mui/material/IconButton";
// import tecosysLogo from "../../CompLawChatBot/assets/tecosysLogo.png"

// const Main = () => {
//   const { chatHistory, setChatHistory } = useContext(Context);

//   const [showPremiumPopup, setShowPremiumPopup] = useState(false);
//   const [showPIDropdown, setShowPIDropdown] = useState(false);
//   const [input,setInput ] = useState("")
//   const [selectedBox, setSelectedBox] = useState(null);

//   const navRef = useRef(null);

//   const handleBoxesClick = (boxText,query) => {
//     setSelectedBox(boxText);
//     setInput(query)
//     handleSendQuestion(query);
//   };
 
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter" && input.trim()) {
//       handleSendQuestion(input);
//     }
//   };

//   // Updated handleSendQuestion function with API integration
//   const handleSendQuestion = async (query) => {
//     const currentPrompt = query || input;

//     if (!currentPrompt.trim()) return;

//     // Add user's question to the chat history
//     setChatHistory([
//       ...chatHistory,
//       { question: currentPrompt, isBot: false },
//     ]);
//     setInput("");

//     try {
//       // Send POST request to the API
//       const response = await fetch(
//         "https://law-api.tecosys.ai/legal-solutions/lawchatbot/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ query: currentPrompt }), // Send the user's query as 'query'
//         }
//       );

//       // If response is not OK, throw an error
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Parse the JSON response
//       const resultData = await response.json();

//       // Add both user's question and bot's response to the chat history
//       setChatHistory([
//         ...chatHistory,
//         { question: currentPrompt, isBot: false },
//         { answer: resultData.answer || "No answer available.", isBot: true },
//       ]);
//     } catch (error) {
//       console.error("Error fetching bot response:", error);

//       // Add error message to chat history if API fails
//       setChatHistory([
//         ...chatHistory,
//         { question: currentPrompt, isBot: false },
//         { answer: "Sorry, something went wrong. Please try again later.", isBot: true },
//       ]);
//     }
//   };

//   // Handle clicks outside the dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         navRef.current &&
//         !navRef.current.contains(event.target) &&
//         !event.target.matches(".nav-img")
//       ) {
//         if (showPIDropdown) {
//           setShowPIDropdown(false);
//         }
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showPIDropdown]);

//   const toggleDropdown = () => {
//     setShowPIDropdown(!showPIDropdown);
//   };

  
//   return (

//     <div className="main">
//       {/* <div className="nav">
//         <img
//           src={assets.user_icon}
//           alt="profile-img"
//           onClick={toggleDropdown}
//           className="nav-img"
//         />
//       </div> */}
//       <div className="relative w-[100px] h-[100px] rounded-full">
//         <img src={tecosysLogo} alt="Tecosys-Logo" className="absolute top-[210px] left-[550px]" />
//       </div>
//       <div ref={navRef}>
//         <ProfileIconDropDown showProfileIconDropdown={showPIDropdown} />
//       </div>

     
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 my-6">
//       {!selectedBox && (
//          <>
//         <div 
//           className="px-1 py-10 bg-indigo-600 text-white rounded-lg cursor-pointer opacity-50 w-[240px] "
//           onClick={() => handleBoxesClick("I want to know my legal rights")}
//         >
//           I want to know my legal rights
//         </div>
//         <div 
//           className="px-1 py-10 bg-indigo-600 text-white rounded-lg cursor-pointer opacity-50 w-[320px] ml-[-90px]"
//           onClick={() => handleBoxesClick("Someone stole my phone, what to do now?")}
//         >
//           Someone stole my phone, what to do now?
//         </div>
//         <div 
//           className="px-1 py-10 bg-indigo-600 text-white rounded-lg cursor-pointer shadow-md opacity-50 w-[240px] ml-[-100px]"
//           onClick={() => handleBoxesClick("I want to Lodge FIR")}
//         >
//           I want to Lodge FIR
//         </div>
//         </>
//       )}
//         {selectedBox && (
//           <div className="px-1 py-10 bg-indigo-600 text-white rounded-lg">
//             {selectedBox}
//           </div>
//         )}
//       </div>

//       <div className="main-container lg:ml-[180px] ml-[10px]">
//         <>
//           {chatHistory.map((history, index) => (
//             <div key={`${history.question}-${index}`} className="result">
//               {history.isBot === false && (
//                 <div className="result-title">
//                   <img className="imgClassUser" src={assets.user_icon} alt="" />
//                   <p className="promptClass">{history.question}</p>
//                 </div>
//               )}
//               {history.isBot === true && (
//                 <div className="result-response-part">
//                   <div className="botImgContainer">

//                   </div>
//                   <div className="formatted-content-wrapper">
//                     <FormattedContent text={history.answer} />
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </>
//         <div className="main-bottom lg:w-[850px] w-[300px]">
//           <div className="search-box lg:max-w-[900px] lg:w-full w-[400px] lg:mr-0 mr-[240px]">
//             <input
//               name="input"
//               onChange={(event) => setInput(event.target.value)}
//               onKeyDown={handleKeyDown}
//               value={input}
//               type="text"
//               placeholder="Ask Me..."
//               className="border-5 border-solid focus:border-indigo-600 focus:ring-0 outline-none p-2 rounded-md"
//             />
//             <IconButton
//               onClick={handleSendQuestion}
//               className="text-gray-600 hover:text-gray-800"
//             >
//               <SendIcon />
//             </IconButton>
//           </div>
//           <div className="bottom-info">
//             <button onClick={() => setShowPremiumPopup(true)}>
//               {/* Save Chat on Premium */}
//             </button>
//           </div>
//         </div>
//       </div>
//       <Popup show={showPremiumPopup} onClose={() => setShowPremiumPopup(false)} />
//     </div>
//   );
// };

// export default Main;


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
import tecosysLogo from "../../CompLawChatBot/assets/tecosysLogo.png";

const Main = () => {
  const { chatHistory, setChatHistory } = useContext(Context);

  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showPIDropdown, setShowPIDropdown] = useState(false);
  const [input, setInput] = useState(""); // Input value
  const [selectedBox, setSelectedBox] = useState(null); // Track the selected box

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

  // Send the question to the API
  const handleSendQuestion = async (query) => {
    const currentPrompt = query || input; // Use the query or the input value

    if (!currentPrompt.trim()) return; // Prevent sending an empty input

    // Add the user's question to the chat history
    setChatHistory([...chatHistory, { question: currentPrompt, isBot: false }]);
    setInput(""); // Clear the input field

    try {
      // API call to fetch the chatbot response
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

      // Add the bot's response to the chat history
      setChatHistory([
        ...chatHistory,
        { question: currentPrompt, isBot: false },
        { answer: resultData.answer || "No answer available.", isBot: true },
      ]);
    } catch (error) {
      console.error("Error fetching bot response:", error);

      // Add an error message to chat history if API fails
      setChatHistory([
        ...chatHistory,
        { question: currentPrompt, isBot: false },
        { answer: "Sorry, something went wrong. Please try again later.", isBot: true },
      ]);
    }
  };

  // Handle clicks outside the profile dropdown
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
          <div key={`${history.question}-${index}`} className="*result* font-600 text-2xl font-bold">
            {/* User's question */}
            {history.isBot === false && (
              <div className="result-title ">
                <img className="imgClassUser" src={assets.user_icon} alt="" />
                <p className="promptClass">{history.question}</p>
              </div>
            )}

            {/* Bot's response */}
            {history.isBot === true && (
              <div className="result-response-part">
                <div className="botImgContainer">
                  <img className="imgClassBot" src={tecosysLogo} alt="" width={30} height={30}/>
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
            <button onClick={() => setShowPremiumPopup(true)}>
              {/* Save Chat on Premium */}
            </button>
          </div>
        </div>
      </div>

      {/* Popup for premium */}
      <Popup show={showPremiumPopup} onClose={() => setShowPremiumPopup(false)} />
    </div>
  );
};

export default Main;
