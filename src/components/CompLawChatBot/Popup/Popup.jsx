// Popup.jsx
import React from "react";
import "./Popup.css";

const Popup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Upgrade to Premium</h2>
        <p>You can save your chats by upgrading to our premium plan.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
