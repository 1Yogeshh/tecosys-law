import React, {useEffect} from "react";
import Sidebar from "../components/CompLawChatBot/Sidebar/Sidebar.jsx";
import Main from "../components/CompLawChatBot/Main/Main.jsx";
import ContextProvider from "./context/Context.jsx";
import "../App.css";
import SideNavbar from "../Sidenavbar/SideNavbar.jsx";
import { useNavigate } from "react-router-dom";


const App = () => {
  const navigate=useNavigate()
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    // Check if token exists
    if (token) {
      // Redirect to home page
      navigate('/law-chat-bot'); // Change '/home' to your home route
    }else{
      navigate('/auth-user');
    }
  }, [token, navigate]);

  return (
    <>
      <ContextProvider>
        <div className="app-container w-full">
          <div className="w-1/5">
          <SideNavbar/>
          </div>
          <Main />
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
