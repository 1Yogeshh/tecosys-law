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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchHistory, setSearchHistory] = useState([]); // State for search history

  const navRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/casesearch");
    } else {
      navigate("/auth-user");
    }

    // Load search history from localStorage when component mounts
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, [token, navigate]);

  // Handle input query change
  const handleQuerySearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  // Save search query result to localStorage
  const saveSearchHistory = (query, results) => {
    const newEntry = { query, results, timestamp: new Date().toLocaleString() };
    const updatedHistory = [newEntry, ...searchHistory];
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  // Fetch query result array (cases) from API
  const handleGetQueryResultArray = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://law-api.tecosys.ai/legal-solutions/case-search-query/",
        { search_query: searchQuery }
      );
      if (response.status === 200) {
        const extractedData = response.data;
        setSearchQueryResultArray(extractedData);

        // Save the search result to history
        saveSearchHistory(searchQuery, extractedData);
      }
    } catch (error) {
      setErrorMessage("Internal Server Error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchHistory]);

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

  // Clear search history
  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  // Re-run a search from history
  const handleReRunSearch = (query, results) => {
    setSearchQuery(query);
    setSearchQueryResultArray(results);
  };

  return (
    <div className="case-search-main-container w-full">
      <div className="w-1/5">
        <SideNavbar />
      </div>
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
              value={searchQuery}
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
                <div className="smallCard" key={index}>
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
                    gap: "30px",
                    width: "100%",
                  }}
                >
                  <span>Respondent Advocate:</span>
                  <span>{summaryData["Respondent Advocate"]}</span>
                </div>
              </div>

              <FormattedContent />
              <button
                className="reset-button"
                onClick={handleResetSearch}
              >
                Reset Search
              </button>
            </div>
          </>
        )}

        {/* Search History Section */}
        {!isSearchSummaryCalled && searchHistory.length > 0 && (
          <div className="search-history">
            <h3>History</h3>
            <ul>
              {searchHistory.map((entry, index) => (
                <li key={index}>
                  <span className="hover:cursor-pointer" onClick={() => handleReRunSearch(entry.query, entry.results)}>
                    {entry.query} - {entry.timestamp}
                  </span>
                </li>
              ))}
            </ul>
            <button onClick={handleClearHistory}>Clear History</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseSearch;
