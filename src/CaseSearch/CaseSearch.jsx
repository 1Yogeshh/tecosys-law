import React, { useEffect, useState, useRef, useCallback } from "react";
import FormattedContent from "../CommonFiles/FormattedContent.jsx";
import ProfileIconDropDown from "../CommonFiles/ProfileIconDropdown.jsx";
import "./CaseSearch.css";
import { assets } from "../components/CompLawChatBot/assets/assets.js";
import axios from "axios";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { IconButton } from "@mui/material";
import SideNavbar from "../Sidenavbar/SideNavbar.jsx";
import { useNavigate } from "react-router-dom";

const CaseSearch = () => {
  const [showPIDropdown, setShowPIDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResultArray, setSearchQueryResultArray] = useState([]);
  const [searchIndex, setSearchIndex] = useState("");
  const [summaryData, setSummaryData] = useState("");
  const [isSearchSummaryCalled, setIsSearchSummaryCalled] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for fetching data
  const [errorMessage, setErrorMessage] = useState(""); // Error state

  const navRef = useRef(null);

  const navigate=useNavigate()

  // Handle input query change
  const handleQuerySearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    // Check if token exists
    if (token) {
      // Redirect to home page
      navigate('/casesearch'); // Change '/home' to your home route
    }else{
      navigate('/auth-user');
    }
  }, [token, navigate]);

  // Fetch query result array (cases) from API
  const handleGetQueryResultArray = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "http://law-api.tecosys.ai/legal-solutions/case-search-query/",
        { search_query: searchQuery }
      );
      if (response.status === 200) {
        const extractedData = response.data;
        setSearchQueryResultArray(extractedData);
      }
    } catch (error) {
      setErrorMessage("Internal Server Error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  // Fetch case summary data by case index
  const handleGetSearchSummaryByIndex = useCallback(async (e) => {
    setIsSearchSummaryCalled(true);
    setSearchIndex(e);
    setSummaryData("");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://law-api.tecosys.ai/legal-solutions/case-search-summary/",
        { index: e }
      );
      if (response.status === 200) {
        const extractedData = response.data[0];
        setSummaryData(extractedData);
      }
    } catch (error) {
      setErrorMessage("Error fetching case summary.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset search data and start a new search
  const handleResetSearch = () => {
    setIsSearchSummaryCalled(false);
    setSearchQuery("");
    setSearchQueryResultArray([]);
    setSummaryData("");
  };

  // Handle click outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.matches(".case-search-nav-img")
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

  // Toggle profile dropdown
  const toggleDropdown = () => {
    setShowPIDropdown(!showPIDropdown);
  };

  return (
    <div className="case-search-main-container w-full">
      <div className="w-1/5">
      <SideNavbar/>
      </div>
      {/* Navbar with profile icon */}
      {/*<div className="case-search-nav">
        <img
          src={assets.user_icon}
          alt="profile-img"
          onClick={toggleDropdown}
          className="case-search-nav-img"
        />
      </div>

      {/* Profile dropdown */}
      {/*<div ref={navRef}>
        <ProfileIconDropDown showProfileIconDropdown={showPIDropdown} />
      </div>*/}

      {/* Main search content */}
      <div className="case-search-secondary-container">
        <p className="case-search-heading1">Case Search</p>
        {!isSearchSummaryCalled && (
          <p className="case-search-heading2">Get Details In A Blink!*</p>
        )}

        {/* Search input field */}
        {!isSearchSummaryCalled && (
          <div
            className="case-search-med-items"
            style={{ position: "relative", width: "100%" }}
          >
            <input
              type="text"
              className="case-search-input"
              placeholder="Enter Case Name"
              onChange={handleQuerySearchInput}
            />
            <IconButton
              onClick={handleGetQueryResultArray}
              sx={{ width: "35px", height: "35px" }}
              className="spcl-input"
            >
              <SendOutlinedIcon />
            </IconButton>
          </div>
        )}

        {/* Error message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Loading state */}
        {loading && <p>Loading...</p>}

        {/* Display search results */}
        {!isSearchSummaryCalled && !loading && (
          <div className="case-search-small-card">
            {Array.isArray(searchQueryResultArray) &&
              searchQueryResultArray.map((item, index) => (
                <div
                  className="smallCard"
                  key={index}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      minWidth: "200px",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      overflow: "hidden",
                      backgroundColor: "#c4c7c5",
                      borderRadius: "4px",
                      padding: "3px 0",
                    }}
                  >
                    {item.case_title}
                  </p>
                  <p style={{ fontSize: "13px", padding: "3px 0" }}>
                    Case No.- {item.case_no}
                  </p>
                  <span
                    className="onHoverSpan"
                    onClick={() => window.open(item.pdf_link, "_blank")}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "13px",
                      alignItems: "center",
                      gap: "15px",
                      width: "100%",
                    }}
                  >
                    <AttachmentOutlinedIcon /> Read the Document
                  </span>
                  {/* Add "Show Summary" Button */}
                  <button
                    onClick={() => handleGetSearchSummaryByIndex(item.index)}
                    className="summary-button"
                  >
                    Show Summary
                  </button>
                </div>
              ))}
          </div>
        )}

        {/* Display case summary */}
        {isSearchSummaryCalled && !loading && (
          <>
            <div className="generated-summary-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f4f9",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
                  <span>Case Title:</span>
                  <span>{summaryData["Case Title"]}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
                  <span>Case No.:</span>
                  <span>{summaryData["Case No"]}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
                  <span>Judges:</span>
                  <span>{summaryData["Judges"]}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
                    <span>Decision Date:</span>
                    <span>{summaryData["Decision Date"]}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
                    <span>Disposal Nature:</span>
                    <span>{summaryData["Disposal Nature"]}</span>
                  </div>
                </div>
                <FormattedContent text={summaryData["Summary"]} />
              </div>
            </div>
            <button onClick={handleResetSearch}>Search Another Case</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CaseSearch;
