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
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
    const [email, setEmail]=useState('')
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editing, setEditing] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const inputRef = useRef(null);
  const navRef = useRef(null);
  const navigate=useNavigate()

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    // Check if token exists
    if (token) {
      // Redirect to home page
      navigate('/casesummariser'); // Change '/home' to your home route
    }else{
      navigate('/auth-user');
    }
  }, [token, navigate]);

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

  useEffect(() => {
    // Fetch user profile data (if needed)
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://law-api.tecosys.ai/api/user/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setName(response.data.name);
      setEmail(response.data.email);
      
       // Set the fetched name to the state
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.put(
        'https://law-api.tecosys.ai/api/user/',
        { name, email, },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setEditing(false)
      setSuccess('Profile updated successfully!');
      toast.success('Profile updated successfully!')
    } catch (error) {
      setError('Error updating profile. Please try again.');

      setEditing(false)
      toast.success('Profile updated successfully!')
      
    }
  };

  return (
    <div className="case-background w-full">

      <div className="absolute flex right-4 top-2 gap-2">
        <div className="h-[30px] w-[30px] border-[1px] border-gray-500 rounded-full"></div>
        <button className="font-medium hover:cursor-pointer" onClick={handleOpenModal}>{name}</button>
      </div>

      <div className="w-1/5">
        <SideNavbar/>
      </div>


      <div className="w-4/5">
      
      <div ref={navRef}>
        <ProfileIconDropDown showProfileIconDropdown={showPIDropdown} /> 
      </div>
      <div style={{alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>
        <div className="case-summariser-container">
            <p className="intro1">Case Summarizer</p>
            <p className="intro2">Too Large File? Let's Summarize!</p>
        </div>
        {!showSummary ? (
          <div className="query-input-box lg:min-w-[70vh] w-[300px]">
            <div {...getRootProps()} className={`dropzone lg:min-w-[70vh] w-[300px] ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <svg  xmlns="http://www.w3.org/2000/svg" width="100" height="80" fill="currentColor" className="bi bi-cloud-upload lg:ml-[40%] ml-[30%] mt-4" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" fill="#c4c7c5"/>
                <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z" fill="#c4c7c5"/>
              </svg>
              {fileName && (
                <div className="mt-5 flex flex-col items-center text-black md:flex-row md:gap-10">
                    <PictureAsPdfTwoToneIcon className="h-24" />
                    <span className="text-sm">{fileName}</span>
                    <span className="text-sm">{fileSize} KB</span>
                    <CancelTwoToneIcon className="text-gray-400 text-sm" onClick={handleFileRemove} />
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
      {/* Modal for Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 top-0 overflow-hidden h-[1500px] bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white fixed rounded-lg p-6 max-w-lg top-44 w-full">
            <button className="absolute top-2 right-2 text-gray-500" onClick={handleCloseModal}>
              <Close/>
            </button>
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            <div className="flex gap-4 items-center justify-center">
              <div className="w-[150px] h-[150px] border-[1px] border-black rounded-full"></div>

              {!editing ? (
                <div className="flex flex-col gap-2">
                <div className="flex font-medium">
                  <p>Name-</p>
                  <p>
                    {name}
                  </p>
                </div>
                <div className="flex font-medium">
                  <p>Email-</p>
                  <p>
                    {email}
                  </p>
                </div>
                <div>
                  <button onClick={()=>setEditing(true)} className="flex justify-center items-center rounded font-medium bg-indigo-600 text-white w-[200px] h-[30px] mt-2">Edit Profile</button>
                </div>
              </div>

              ):(
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex gap-1 flex-col font-medium">
                  <p>Name</p>
                  <input
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className=" outline-none bg-zinc-100 pt-1 pb-1 pl-2 pr-2"
                  />
                </div>
                <div className="flex gap-1 flex-col font-medium">
                  <p>Email</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className=" outline-none bg-zinc-100 pt-1 pb-1 pl-2 pr-2"
                  />
                </div>
                <div>
                  <button type="submit" className="flex justify-center items-center rounded font-medium bg-indigo-600 text-white w-[200px] h-[30px] mt-2">Save changes</button>
                </div>
              </form>
              )
              }
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseSummariser;
