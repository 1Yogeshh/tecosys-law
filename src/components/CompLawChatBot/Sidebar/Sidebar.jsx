import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../assets/assets.js";
import { Context } from "../../../LawChatBot/context/Context.jsx";
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from "@mui/material";

const Sidebar = () => {
  const [Extended, setExtended] = useState(false);
  const { newChat, allChatHistory, setAllChatHistory} = useContext(Context);

    const getFirstQuestion = (firstInstanceOfSessionChatHistory) => {
      if (firstInstanceOfSessionChatHistory && firstInstanceOfSessionChatHistory.question) {
        const firstQuestion = firstInstanceOfSessionChatHistory.question;
        return firstQuestion.length > 18 ? firstQuestion.slice(0, 18) + '...' : firstQuestion;
      }
      return 'No question found';
    };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={() => setExtended((prev) => !prev)}
        />
        <div onClick={() => newChat()} className="sidebar-button" style={{marginTop: "40px"}}>
          <QuestionAnswerOutlinedIcon/>
          {Extended ? <p>New Chat</p> : null}
        </div>
        {Extended ? (
          <div className="recent">
            <div style={{marginTop: "20px", marginBottom: "10px"}}>
              <hr style={{border: "none", borderTop: "1.5px solid #E0DDDD"}}/>
              <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingLeft: "10px"}}>
                <p className="recent-title" style={{color: "#808080", cursor: "pointer"}}>Your Chat</p>
                <IconButton>
                  <DeleteOutlineOutlinedIcon onClick={()=>setAllChatHistory([])} />
                </IconButton>
              </div>
              <hr style={{border: "none", borderTop: "1.5px solid #E0DDDD"}}/>  
            </div>
            <div className="chatHistoryContainer" style={{display: "flex", flexDirection: "column", overflowY: "auto", maxHeight: "235px"}}>
              {allChatHistory.length > 0 && allChatHistory.map((chat, index) => {
                // console.log("chat at 1 sch*:",chat.sessionChatHistory[0][1]);
                const firstQuestion = getFirstQuestion(chat.sessionChatHistory[0][1]);
                return (
                  <div className="sidebar-button" key={index}>
                    <img src={assets.message_icon} alt="" />
                    <p>{firstQuestion}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="sidebar-button">
          <SettingsOutlinedIcon/>
          {Extended ? <p style={{color: "#808080",}}>Settings</p> : null}
        </div>
        <div className="sidebar-button">
          <DiamondOutlinedIcon/>
          {Extended ? <p style={{color: "#808080",}}>Upgrade to Premium</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
