import React, { useState, useCallback, useRef, useEffect } from "react";
import "./CaseSummariser.css";
import axios from "axios";
import FormattedContent from "../CommonFiles/FormattedContent.jsx";
import { useDropzone } from 'react-dropzone';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import ProfileIconDropDown from "../CommonFiles/ProfileIconDropdown.jsx"
import {assets} from "../components/CompLawChatBot/assets/assets.js"
import SideNavbar from "../Sidenavbar/SideNavbar.jsx";



const CaseSummariser = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("")
  const [url, setUrl] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [showPIDropdown, setShowPIDropdown] = useState(false);
  const [isValidURL, setIsValidURL] = useState(true);

  const inputRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current && !navRef.current.contains(event.target) && !event.target.matches(".cs-nav-img")) {
        if (showPIDropdown) {
          setShowPIDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPIDropdown]);

  const toggleDropdown = () => {
    setShowPIDropdown(!showPIDropdown);
  };

  const handleURLChange = (e) => {
    setUrl(e.target.value);
    if (url && !isValidUrl(url)) {
      setIsValidURL(false); // Set state for invalid URL
    } else {
      setIsValidURL(true); // Set state for valid URL
    }
  };

  const isValidUrl = (urlString) => {
    try {
      new URL(urlString);
      const regex = /^(ftp|http|https):\/\/[^ "]+$/;
      return regex.test(urlString);
    } catch (e) {
      return false;
    }
  };
  

  const handleGenerateSummary = async ()=>{
    setShowSummary(true);
    if(!selectedFile && !url){
      alert("Please select a file and enter a URL");
      return;
    }
    if(!isValidUrl(url) && url){
      alert("Please provide a valid url");
      return;
    }

    try{
      const response = await axios.post('https://law-api.tecosys.ai/legal-solutions/case-summarizer/', { pdf_file: selectedFile, url: url}, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const extractedData= response.data.summary;
      setSummaryData(extractedData);

    } catch{ alert("Data uploading failed")}

  };

  const onDrop = useCallback((acceptedFile) => {
    if (acceptedFile.length > 0) {
      const file = acceptedFile[0];
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(2));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/pdf',
    multiple: false,
  });

  const handleFileRemove = () =>{
    setFileName("");
    setFileSize("");
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const handleBack = () =>{
    setShowSummary(false);
    setFileName("");
    setFileSize("");
    setSelectedFile(null);
  };

  return (
    <div className="case-background w-full">

      <div className="w-1/5">
        <SideNavbar/>
      </div>


      <div className="w-4/5">
      {/*<div className="cs-nav">
        <img
          src={assets.user_icon}
          alt="profile-img"
          onClick={toggleDropdown}
          className="cs-nav-img"
        />
      </div>*/}
      <div ref={navRef}>
        <ProfileIconDropDown showProfileIconDropdown={showPIDropdown} /> 
      </div>
      <div style={{alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>
        <div className="case-summariser-container">
            <p className="intro1">Case Summarizer</p>
            <p className="intro2">Too Large File? Let's Summarize!</p>
        </div>
        {!showSummary ? (
          <div className="query-input-box">
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <svg  xmlns="http://www.w3.org/2000/svg" width="100" height="80" fill="currentColor" className="bi bi-cloud-upload ml-[43%] mt-4" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" fill="#c4c7c5"/>
                <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z" fill="#c4c7c5"/>
              </svg>
              {fileName && (
                <div style={{ marginTop: '20px', display: "flex", flexDirection: "row", gap: "40px", justifyContent:"center", alignItems: "center", color: "black"}}>
                  <PictureAsPdfTwoToneIcon className="h-[100px]"/>
                  <span style={{fontSize: "14px"}}>{fileName}</span>
                  <span style={{fontSize: "14px"}}>{fileSize} KB</span>
                  <CancelTwoToneIcon sx={{color: "#c4c7c5", size: "14px"}} onClick={handleFileRemove}/>
                </div>
              )}
              {isDragActive ? (
                <p style={{marginTop: "20px"}}>Drop the PDF here ...</p>
              ) : (
                !fileName && <p style={{marginTop: "20px"}} className="font-medium">Drag & drop a PDF here, or click to select one</p>
              )}
            </div>
            <input name="case-url" type="text" value={url} onChange={handleURLChange} className="case-input" placeholder="Or paste a case pdf link here..."/>
            {!isValidURL && url && (<p style={{color: "red", zIndex: "2"}}>Please provide a valid link</p>)}
            
            <button className="case-btn2" onClick={handleGenerateSummary} style={{ margin: "0 auto" }}>Show Summary</button>
          </div>
        ) : (
          <>
            <div className="summary-container">
              <FormattedContent text={summaryData} />
            </div>
            <button className="case-btn2 summarize-btn" onClick={handleBack} style={{ margin: "0 auto" }}>Summarize another</button>
          </>
        )}
      </div>
      </div>
      
    </div>
  );
};

export default CaseSummariser;
