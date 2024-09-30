import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import CommonHomePage from "./CommonHomePage.js";
import DraftDataInput from "./RentalAgreementDrafting/DraftDataInput.jsx";
import MakePayment from "./RentalAgreementDrafting/MakePayment.jsx";
import LawChatBotPage from "./LawChatBot/LawChatBotPage.jsx";
import CaseReminder from "./CaseReminder/CaseReminderPage.jsx";
import RADIntroPage from "./RentalAgreementDrafting/RADIntroPage.jsx";
import NewDraftDataInput from "./RentalAgreementDrafting/NewDraftDataInput.jsx";
import CommonHomePage2 from "./CommonHomePage2.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoginPage from "./components/LoginPage/LoginPage.jsx";
import CaseSummariser from "./CaseSummariser/CaseSummariser.jsx";
// import LoginPage from "./components/LoginPage/LoginPage.jsx";
// import LoginPage from "./components/LoginPage/LoginPage.jsx";
import { ThemeProvider } from "../src/components/CommonHomePage/ThemeContext.js";
import CaseSearch from "./CaseSearch/CaseSearch.jsx";
import ForgetPassword from "./components/Forget-Password/Forget-password.jsx";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        {/* before pushing the code please update following two lines. */}
        {/* <Route path="/" element={<CommonHomePage />} /> */}
        <Route path="/" element={<CommonHomePage2 />} />
        {/*<Route path="/rad" element={<RADIntroPage />} />
        <Route path="/draft-data-input" element={<DraftDataInput />} />
        <Route path="/new-rad" element={<NewDraftDataInput />} />
        <Route path="/make-payment" element={<MakePayment />} />*/}
        <Route path="/law-chat-bot" element={<LawChatBotPage />} />
        {/*<Route path="/case-reminder" element={<CaseReminder />} />*/}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/auth-user" element={<LoginPage />} />
        <Route path="/casesummariser" element={<CaseSummariser />} />
        <Route path="/casesearch" element={<CaseSearch />} />
        <Route path="/forget-password" element={<ForgetPassword/>}/>

        {/* <Route pathe="/case-reminder" element={<CaseReminderPage/>}/> */}
      </Routes>
    </Router>
    <ToastContainer/>
    </>
  );
};

export default App;
