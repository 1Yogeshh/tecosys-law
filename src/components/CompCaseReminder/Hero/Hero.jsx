import React, { useState } from "react";
import "./Hero.css";

const Hero = (props) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    email: "",
  });

  const InputEvent = (event) => {
    const { name, value } = event.target;
    setNote((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const addEvent = () => {
    props.pasNote(note);
    setNote({
      title: "",
      content: "",
      date: "",
      email: "",
    });
  };

  return (
    <>
      <div className="hero">
        <div className="hero-top">
          <p>
            <i className="fa-solid fa-house"></i> Home
            <i className="fa-solid fa-angle-right"></i>{" "}
            <span>Case-Reminder</span>
          </p>
        </div>
        <div className="hero_bottom">
          <div className="types_reminder">
            <p>Add Task</p>
          </div>
          <div className="task-details">
            <form action="" className="form">
              <div className="case_Information">
                <input
                  className="case_number"
                  type="number"
                  name=""
                  id=""
                  placeholder="Enter Your Case number"
                />
                <input
                  className="case_number"
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Your Case Title"
                />
                <select name="" id="">
                  <option value="">Criminal</option>
                  <option value="">Civil</option>
                  <option value="">Family</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter Your Court Name"
                  className="case_number"
                />
              </div>
              <div className="parties-involved">
                <div className="client_info">
                  <p>Client-Information</p>
                  <input type="text" placeholder="Enter Your Name" />
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter Your Number"
                    className="input_client"
                  />
                  <input type="text" placeholder="Enter your Address" />
                </div>
                <div className="opposing-party-info">
                  <p>Opposing Party Info</p>
                  <input type="text" placeholder="Enter Your Name" />
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter Your Number"
                    className="case_number"
                  />
                </div>
                <div className="judge-info">
                  <input
                    type="text"
                    placeholder="Enter Judge Name"
                    className="case_number"
                  />
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter Judge Number"
                    className="case_number"
                  />
                </div>
              </div>
              <p className="p">Task Details</p>
              <input
                className="case_number"
                type="text"
                placeholder="Enter Task"
                name="title"
                autoComplete="off"
                value={note.title}
                onChange={InputEvent}
              />
              <textarea
                className="case_number"
                name="content"
                value={note.content}
                onChange={InputEvent}
                placeholder="Enter Details"
              ></textarea>
              <input
                type="datetime-local"
                value={note.date}
                name="date"
                onChange={InputEvent}
                className="date"
              />
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={note.email}
                onChange={InputEvent}
                className="case_number"
              />
            </form>
            <button onClick={addEvent} className="button">
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
