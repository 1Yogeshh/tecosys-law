import React from "react";
import Sidebar from "../components/CompLawChatBot/Sidebar/Sidebar.jsx";
import Main from "../components/CompLawChatBot/Main/Main.jsx";
import ContextProvider from "./context/Context.jsx";
import "../App.css";
import SideNavbar from "../Sidenavbar/SideNavbar.jsx";
const App = () => {
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
