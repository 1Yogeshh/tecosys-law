import React, { useEffect, useState, useRef, useCallback } from "react";
import FormattedContent from "../CommonFiles/FormattedContent.jsx";
import ProfileIconDropDown from "../CommonFiles/ProfileIconDropdown.jsx";
import "./CaseSearch.css";
import { assets } from "../components/CompLawChatBot/assets/assets.js";
import axios from "axios";import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { IconButton } from "@mui/material";
import SideNavbar from "../Sidenavbar/SideNavbar.jsx";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";

const CaseSearch = () => {
  const carouselRef = useRef(null);
  const scroll = (direction) => {
    const scrollAmount = 500;

    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const [showPIDropdown, setShowPIDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResultArray, setSearchQueryResultArray] = useState([]);
  const [isSearchSummaryCalled, setIsSearchSummaryCalled] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for fetching data
  const [errorMessage, setErrorMessage] = useState(""); // Error state
  const [searchHistory, setSearchHistory] = useState([]); // State for search history
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

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
      setErrorMessage("Error fetching search results.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchHistory]);

  // Fetch case summary data by case index
  // const handleGetSearchSummaryByIndex = useCallback(
  //   (pdfLink) => {
  //     setPdfLink(pdfLink); // Set PDF link in context to trigger fetching summary in CaseSummariser
  //     setIsModalOpen(true); // Open the modal to display summary
  //   },
  //   [setPdfLink]
  // );

  // Reset search data and start a new search
  const handleResetSearch = () => {
    setIsSearchSummaryCalled(false);
    setSearchQuery("");
    setSearchQueryResultArray([]);
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

  // Trigger search when "Enter" is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleGetQueryResultArray();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleGetQueryResultArray]);

  useEffect(() => {
    // Fetch user profile data (if needed)
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("https://law-api.tecosys.ai/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.put(
        "https://law-api.tecosys.ai/api/user/",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );
      setEditing(false);
      setSuccess("Profile updated successfully!");
      toast.success("Profile updated successfully!");
    } catch (error) {
      setError("Error updating profile. Please try again.");
      setEditing(false);
      toast.error("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="case-search-main-container w-full">
      <div className="absolute flex right-4 top-2 gap-2">
        <div className="h-[30px] w-[30px] border-[1px] border-gray-500 rounded-full"></div>
        <a className="font-medium hover:cursor-pointer" onClick={handleOpenModal}>
          {name}
        </a>
      </div>

      <div className="w-1/5">
        <SideNavbar />
      </div>
      <div className="case-search-secondary-container w-4/5">
        <p className="case-search-heading1">Case Search</p>
        {!isSearchSummaryCalled && <p className="case-search-heading2">Get Details In A Blink!*</p>}
        {!isSearchSummaryCalled && (
          <div className="case-search-med-items" style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              className="case-search-input"
              placeholder="Enter Case Name"
              onChange={handleQuerySearchInput}
              value={searchQuery}
            />
            <IconButton onClick={handleGetQueryResultArray} sx={{ width: "35px", height: "35px" }} className="spcl-input">
              <SendOutlinedIcon />
            </IconButton>
          </div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {loading && <p>Loading...</p>}

        <div className="relative w-full flex flex-col items-start overflow-y-auto max-h-[80vh] ml-[80px]">
          <div ref={carouselRef} className="flex flex-col gap-6 w-full">
            {Array.isArray(searchQueryResultArray) &&
              searchQueryResultArray.map((item, index) => (
                <div className="w-full" key={index}>
                  <p
                    className={`text-lg font-semibold mb-2 ${
                      item["PDF Link"] ? "text-indigo-600 cursor-pointer " : "text-gray-500"
                    } hover:underline`}
                    onClick={() => {
                      if (item["PDF Link"]) {
                        window.open(item["PDF Link"], "_blank");
                      } else {
                        toast.info("No PDF available for this case.");
                      }
                    }}
                  >
                    {item["Case Title"] || "No Case Title Available"}
                  </p>

                  <p className="text-sm text-gray-700 mb-4">Case No.- {item["Case No"] || "N/A"}</p>
                </div>
              ))}
          </div>
        </div>

        {!isSearchSummaryCalled && searchHistory.length > 0 && (
          <div className="search-history bg-white shadow-md rounded-lg p-4 mt-6">
            <h3 className="text-center text-xl font-600 font-bold mb-3">History</h3>
            <ul>
              {searchHistory.map((entry, index) => (
                <li key={index}>
                  <span
                    className="hover:cursor-pointer hover:bg-indigo-600 hover:text-white p-1"
                    onClick={() => handleReRunSearch(entry.query, entry.results)}
                  >
                    {entry.query} - {entry.timestamp}
                  </span>
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg" onClick={handleClearHistory}>
              Clear History
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleCloseModal}>
              <Close />
            </button>
            
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 top-0 overflow-hidden h-[1500px] bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white fixed rounded-lg p-6 max-w-lg top-44 w-full">
            <button className="absolute top-2 right-2 text-gray-500" onClick={handleCloseModal}>
              <Close />
            </button>
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            <div className="flex gap-4 items-center justify-center">
              <div className="w-[150px] h-[150px] border-[1px] border-black rounded-full"></div>

              {!editing ? (
                <div className="flex flex-col gap-2">
                  <div className="flex font-medium">
                    <p>Name-</p>
                    <p>{name}</p>
                  </div>
                  <div className="flex font-medium">
                    <p>Email-</p>
                    <p>{email}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => setEditing(true)}
                      className="flex justify-center items-center rounded font-medium bg-indigo-600 text-white w-[200px] h-[30px] mt-2"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <div className="flex gap-1 flex-col font-medium">
                    <p>Name</p>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className=" outline-none bg-zinc-100 pt-1 pb-1 pl-2 pr-2"
                    />
                  </div>
                  <div className="flex gap-1 flex-col font-medium">
                    <p>Email</p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className=" outline-none bg-zinc-100 pt-1 pb-1 pl-2 pr-2"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex justify-center items-center rounded font-medium bg-indigo-600 text-white w-[200px] h-[30px] mt-2"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseSearch;