import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/CompRentalAgreementDrafting/Header.jsx";
import Body from "./components/CompRentalAgreementDrafting/Body.jsx";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#fffff",
    alignItems: "center",
    overflowY: "auto",
    zIndex: "-1",
  },
  button: {
    margin: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
}));

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleButtonClickForRADIntro = () => {
    navigate("/rad");
  };

  const handleButtonClickForLawChatBot = () => {
    navigate("/law-chat-bot");
  };

  const handleButtonClickForCaseReminder = () => {
    navigate("/case-reminder");
  };

  return (
    <div>
      <Header />
      <div className={classes.container}>
        <Body />
        <button
          className={classes.button}
          onClick={handleButtonClickForRADIntro}
        >
          Go to Draft Data Input
        </button>
        <button
          className={classes.button}
          onClick={handleButtonClickForLawChatBot}
        >
          Go to Law Chatbot
        </button>
        <button
          className={classes.button}
          onClick={handleButtonClickForCaseReminder}
        >
          Go to Case Reminder
        </button>
        {/* <button className={classes.button} onClick={handleButtonClickForCaseReminder}>
          Go to Law Case Reminder
        </button> */}
      </div>
    </div>
  );
};

export default Home;
