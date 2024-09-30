import React, { useState } from "react";
// import Navbar from "./Components/Navbar/Navbar";
// import Hero from "./Components/Hero/Hero";
// import Footer from "./Components/Footer/Footer";
// import Note from "./Components/Note/Note";
import Navbar from "../components/CompCaseReminder/Navbar/Navbar";
import Hero from "../components/CompCaseReminder/Hero/Hero";
import Footer from "../components/CompCaseReminder/Footer/Footer";
import Note from "../components/CompCaseReminder/Note/Note";

const App = () => {
  const [addItem, setaddItem] = useState([]);

  const addNote = (note) => {
    fetch("/send-reminder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setaddItem((prevData) => [...prevData, note]);
      })
      .catch((error) => console.error("Error:", error));
  };

  const onDelete = (id) => {
    setaddItem((oldData) => oldData.filter((_, index) => index !== id));
  };

  return (
    <>
      <Navbar />
      <Hero pasNote={addNote} />
      {addItem.map((val, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={val.title}
            content={val.content}
            date={val.date} // Pass the date to Note component
            deleteItem={onDelete}
          />
        );
      })}
      <Footer />
    </>
  );
};

export default App;
