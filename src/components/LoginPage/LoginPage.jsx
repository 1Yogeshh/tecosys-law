// import React, { useState, useEffect } from "react";
// import "./LoginPage.css";
// import PrivacyPolicyModal from "../../CommonFiles/PrivacyPolicyModal";
// import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
// import { MuiOtpInput } from 'mui-one-time-password-input'
// import IconButton from '@mui/material/IconButton';
// import axios from 'axios'; 
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";


// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [isRightPanelActive, setIsRightPanelActive] = useState(false);
//   const [signInData, setSignInData] = useState({
//     email: "",
//     password: ""
//   });
//   const [signUpData, setSignUpData] = useState({
//     username:"",
//     name: "",
//     email: "",
//     password: "",
//     confirm_password:""
//   });
//   const [retypePassword, setRetypePassword] = useState('');
//   const [passwordMatch, setPasswordMatch] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRetypePassword, setShowRetypePassword] = useState(false);
//   const [showSignInPassword, setShowSignInPassword] = useState(false);
//   const [openOTPSection, setOpenOTPSection] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(120);  // 2 minutes in seconds
//   const [startCountdown, setStartCountdown] = useState(false);
//   const [otp, setOtp] = useState('')
//   const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false)

//   const handleChange = (newValue) => {
//     setOtp(newValue)
//   }

//   const token = localStorage.getItem('token'); // Retrieve token from localStorage

//   useEffect(() => {
//     // Check if token exists
//     if (token) {
//       // Redirect to home page
//       navigate('/'); // Change '/home' to your home route
//     }
//   }, [token, navigate]);

//   // Toggle function for password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleRetypePasswordVisibility = () => {
//     setShowRetypePassword(!showRetypePassword);
//   };

//   const toggleSignInPasswordVisibility = () =>{
//     setShowSignInPassword(!showSignInPassword);
//   }

//   // below one is for updating each details onchange
//   const handleSignInDataChange = (e) =>{
//     setSignInData({...signInData, [e.target.name]: e.target.value});
//   };

//   // same for this also
//   const handleSignUpDataChange = (e) =>{
//     setSignUpData({...signUpData, [e.target.name]: e.target.value});
//   };

//   // to handle retype password change and validate passwords
//   const handleRetypePasswordChange = (e) => {
//     setRetypePassword(e.target.value);
//     validatePasswords(signUpData.password, e.target.value);
//   };

//   // Validate that both passwords match
//   const validatePasswords = (password, retypePassword) => {
//     if(retypePassword === ''){
//       setPasswordMatch(null);
//     }
//     else if (password === retypePassword) {
//       setPasswordMatch(true);
//     } else {
//       setPasswordMatch(false);
//     }
//   };



//   // this one for transfering signup data to backend please check the endpoint below
//   const handleSignupDataSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("https://law-api.tecosys.ai/api/register/", {name: signUpData.name,username:signUpData.username, email: signUpData.email, password: signUpData.password,confirm_password:signUpData.confirm_password});
//       console.log(response);
//       if(response.status === 201)        // please confirm that if response is set 201 created or 200 success.
//       {
//         setOpenOTPSection(true);
//         setStartCountdown(true);
//       }
//     } catch (error) {
//       console.error("Signup failed: ", error.response); 
//       toast.error("signup failed")
//     }
//   };
//   // handle otp submit
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("https://law-api.tecosys.ai/api/verify-otp/", {
//         email: signUpData.email,
//         otp: otp
//       });

//       if (response.status === 200) {
//         toast.success("OTP verified successfully!");

//       } else {
//         toast.error("OTP verification failed!");
//       }
//     } catch (error) {
//       console.error("OTP verification failed: ", error.response);
//       toast.error("OTP verification failed!");
//     }
//   };

//   // Countdown logic
//   useEffect(() => {
//     let timer;
//     if (startCountdown && timeLeft > 0) {
//       timer = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);  // Clear timer on component unmount
//   }, [startCountdown, timeLeft]);

//   // Format time for display
//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
//   };

//   // this one for sending signin data to backend, check endpoint
//   const handleSigninDataSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("https://law-api.tecosys.ai/api/login/", {email: signInData.email, password: signInData.password});
//       if (response.status === 200) {
//         const { token } = response.data;


//         // Store token in localStorage
//         localStorage.setItem("token", token);


//         toast.success("Login successful!"); 

//         // Redirect to the homepage or any other protected route
//         navigate('/');
//       }

//     } catch (error) {
//       toast.error("Login failed!");
//     }
//   };

//   const handleSignUpClick = () => {
//     setIsRightPanelActive(true);
//   };

//   const handleSignInClick = () => {
//     setIsRightPanelActive(false);
//   };

//   // handle privacy policy
//   const handlePrivacyPolicy = () =>{
//     setOpenPrivacyPolicy(!openPrivacyPolicy);
//   }

//   return (
//     <div
//       className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
//       <div className="form-container sign-up-container w-[400px] lg:w-1/2">
//         <form className="dataSubmitForm" onSubmit={openOTPSection ? handleOtpSubmit : handleSignupDataSubmit}>
//           {openOTPSection ? ( 
//             <>
//               <h1 className="h1Header">Email Verification</h1>
//               <p style={{color: 'white', padding: "10px", backgroundColor: "#3D3D3D", borderRadius: "5px", margin: '25px 0'}}>An OTP has been sent to your email {signUpData.email}. Please enter the OTP below to verify your account.</p>
//               {/* Countdown Timer */}
//               {startCountdown && timeLeft > 0 && (
//                 <p style={{ color: 'red', fontWeight: 'bold', marginBottom: "15px"}}>Time remaining: {formatTime(timeLeft)}</p>
//               )}
//               <MuiOtpInput value={otp} length={4} onChange={handleChange} sx={{
//                 input: {
//                   color: 'black', 
//                   backgroundColor: 'white',
//                   width: '2rem',
//                   height: '2rem',
//                   fontSize: '1.2rem',
//                   textAlign: 'center',
//                   margin: '0.2rem',
//                   border: '1px solid black',
//                   borderRadius: '4px',
//                 },}}/>
//               <p style={{color: 'white', padding: "10px", backgroundColor: "#3D3D3D", borderRadius: "5px", margin: "20px 0"}}>Didn't receive the OTP? Resend OTP</p>
//               <button className="buttonClass" type="submit">Verify OTP</button>
//             </>
//           ):(
//           <>
//           <h1 className="h1Header">Create Account</h1>
//             <div style={{margin: "20px 0"}}>
//               <a href="">
//                 <button className="gsi-material-button">
//                   <div className="gsi-material-button-state"></div>
//                   <div className="gsi-material-button-content-wrapper">
//                     <div className="gsi-material-button-icon">
//                       <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'block' }}>
//                         <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
//                         <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
//                         <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
//                         <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
//                         <path fill="none" d="M0 0h48v48H0z" />
//                       </svg>
//                     </div>
//                     <span style={{ color: "black" }}>Continue with Google</span>
//                   </div>
//                 </button>
//               </a>
//             </div>
//             <p style={{color: "white", margin: "10px 0", fontSize: '16px', fontWeight:'500'}}>Or</p>

//             <input className="inputClass w-full lg:w-4/5" name="name" value={signUpData.name} type="text" placeholder=" Enter your full name" onChange={handleSignUpDataChange} required={true} />

//             <input className="inputClass w-full lg:w-4/5" name="username" value={signUpData.username} type="text" placeholder=" Enter your username" onChange={handleSignUpDataChange} required={true} />

//             <input className="inputClass w-full lg:w-4/5" name="email" value={signUpData.email} type="email" placeholder="Enter your email address" onChange={handleSignUpDataChange} required={true} />

//             <div className="relative w-[370px] lg:w-full">

//               <input className="inputClass" name="password" value={signUpData.password} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" onChange={handleSignUpDataChange} style={{ width: '80%',}} required={true} />

//               <IconButton onClick={togglePasswordVisibility} style={{ position: 'absolute', cursor: 'pointer', right: '60px', top: '50%', transform: 'translateY(-50%)', zIndex:'4', marginRight:'10px' }}>
//                 {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
//               </IconButton>

//             </div>

//           <div className="relative mb-2 w-[370px] lg:w-full">
//             <input className="inputClass" name="confirm_password" value={signUpData.confirm_password} type={showPassword ? 'text' : 'password'} placeholder="Confirm your password" onChange={handleSignUpDataChange} style={{ width: '80%',}} required={true} />
//               <IconButton onClick={toggleRetypePasswordVisibility} style={{ position: 'absolute', cursor: 'pointer', right: '60px', top: '50%', transform: 'translateY(-50%)', zIndex:'4', marginRight:'10px' }}>
//                 {showRetypePassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
//               </IconButton>
//             </div>

//             <button className="buttonClass font-medium w-[300px] lg:w-4/5" type="submit">Sign Up</button>
//             <div className="flex mt-2 text-white font-medium gap-2 lg:hidden">
//             <p >
//               Already have an account!
//             </p>
//             <button  id="signIn" onClick={handleSignInClick} style={{backgroundColor:'rgb(79 70 229)'}}>
//               Log In
//             </button>
//           </div>

//             <p style={{margin: "12px 0", color: "white", fontSize: "12px", marginTop:'20px'}}>By continuing, you agree to LawCrats’s Terms of Use. Read our <span onClick={handlePrivacyPolicy} style={{cursor: "pointer", textDecorationLine: "underline"}}>Privacy Policy</span>.</p>

//             <PrivacyPolicyModal open={openPrivacyPolicy} handleClose={handlePrivacyPolicy} />
//           </>
//         )}
//         </form>
//       </div>
//       <div className="form-container sign-in-container w-[400px] lg:w-1/2">
//         <form className="dataSubmitForm" onSubmit={handleSigninDataSubmit}>
//           <h1 className="h1Header">Log in into your account </h1>
//           <div style={{margin: "20px 0"}}>
//             <a>
//               <button className="gsi-material-button">
//                 <div className="gsi-material-button-state"></div>
//                 <div className="gsi-material-button-content-wrapper">
//                   <div className="gsi-material-button-icon">
//                     <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: 'block' }}>
//                       <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
//                       <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
//                       <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
//                       <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
//                       <path fill="none" d="M0 0h48v48H0z" />
//                     </svg>
//                   </div>
//                   <span style={{ color: "black", fontSize: "14px", fontWeight:'600' }}>Continue with Google</span>
//                 </div>
//               </button>
//             </a>
//           </div>
//           <span style={{color: "white", margin: "10px 0", fontSize: '16px', fontWeight:'600'}}>Or</span>
//           <input className="inputClass w-full lg:w-4/5 " name="email" value={signInData.email} type="email" placeholder="Enter your email address" onChange={handleSignInDataChange} required={true} />
//           <div className="relative mb-2 w-full lg:w-4/5">
//              <input
//              className="inputClass w-full p-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//              name="password"
//              value={signInData.password}
//              type={showSignInPassword ? 'text' : 'password'}
//              placeholder="Enter your password"
//              onChange={handleSignInDataChange}
//              required
//               />
//              <button
//              onClick={toggleSignInPasswordVisibility}
//              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//              type="button"
//              >
//             {showSignInPassword ? (
//             <VisibilityOffOutlined />
//             ) : (
//             <VisibilityOutlined />
//             )}
//            </button>
//          </div>

//           <a href="/forget-password" style={{ fontSize: "16px", color: "white", marginBottom: "10px",  fontWeight:'600' }}>Forgot password?</a>
//           <button className="buttonClass font-medium w-[300px] lg:w-4/5" type="submit">Log In</button>
//           <div className="flex mt-2 text-white font-medium gap-2 lg:hidden">
//             <p>Don't have and Account?</p>
//             <button  id="signUp" className="underline" onClick={handleSignUpClick} style={{backgroundColor:'rgb(79 70 229)'}}>
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//       <div className="overlay-container hidden lg:block">
//         <div className="overlay">
//           <div className="overlay-panel overlay-left">
//             <h1 className="h1Header">Hello Friend !</h1>
//             <p style={{margin: "20px 0", fontWeight: 400, fontSize: 18}}>
//               Please provide the information to register your account.
//             </p>
//             <p style={{marginBottom: "15px", fontWeight: 600, fontSize: 16}}>
//               Already have an account!
//             </p>
//             <button className="ghost" id="signIn" onClick={handleSignInClick} style={{backgroundColor:'rgb(79 70 229)'}}>
//               Log In
//             </button>
//           </div>
//           <div className="overlay-panel overlay-right">
//             <h1 className="h1Header">Welcome Back !</h1>
//             <p style={{margin: "20px 0", fontWeight: 400, fontSize: 18}}>Don’t have an account?</p>
//             <button className="ghost" id="signUp" onClick={handleSignUpClick} style={{backgroundColor:'rgb(79 70 229)'}}>
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import PrivacyPolicyModal from "../../CommonFiles/PrivacyPolicyModal";
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();

  // State for panel switching
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // State for login form data
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  // State for signup form data
  const [signUpData, setSignUpData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  // States for various UI interactions
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [openOTPSection, setOpenOTPSection] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [startCountdown, setStartCountdown] = useState(false);
  const [otp, setOtp] = useState('');
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  // Retrieve token from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    // If token exists, navigate to the homepage (or another protected route)
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Toggle visibility for sign-up password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle visibility for confirm password
  const toggleRetypePasswordVisibility = () => {
    setShowRetypePassword(!showRetypePassword);
  };

  // Toggle visibility for sign-in password
  const toggleSignInPasswordVisibility = () => {
    setShowSignInPassword(!showSignInPassword);
  };

  // Update sign-in data on form input change
  const handleSignInDataChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  // Update sign-up data on form input change
  const handleSignUpDataChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  // Handle retype password change
  const handleRetypePasswordChange = (e) => {
    const newRetypePassword = e.target.value;
    setRetypePassword(newRetypePassword); 
    validatePasswords(signUpData.password, newRetypePassword);
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setSignUpData({ ...signUpData, password: newPassword });
    validatePasswords(newPassword, retypePassword);
  };

  // Validate if both passwords match
  const validatePasswords = (password, retypePassword) => {
    if (password === retypePassword) {
      setPasswordMatch(true);  // Passwords match
    } else {
      setPasswordMatch(false); // Passwords do not match
    }
  };

  // Submit sign-up data to the backend
  // const handleSignupDataSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!passwordMatch) {
  //     toast.error("Passwords do not match!");
  //     return;
  //   }

  //   try {
  //     // Sending sign-up data to backend
  //     const response = await axios.post("https://law-api.tecosys.ai/api/register/", {
  //       username: signUpData.username,  // Backend expects `username`
  //       name: signUpData.name,          // Backend expects `name`
  //       email: signUpData.email,        // Backend expects `email`
  //       password: signUpData.password,  // Backend expects `password`
  //       confirm_password: signUpData.confirm_password // Backend expects `confirm_password`
  //     });

  //     // If sign-up is successful, switch to OTP verification
  //     if (response.status === 201) {
  //       setOpenOTPSection(true);
  //       setStartCountdown(true);
  //     }
  //   } catch (error) {
  //     console.error("Signup failed: ", error.response);
  //     toast.error("Signup failed! Please check your details.");
  //   }
  // };
  const handleSignupDataSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match before proceeding
    if (!passwordMatch) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      // Send the sign-up data to backend
      const response = await axios.post("https://law-api.tecosys.ai/api/register/", {
        username: signUpData.username,
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        confirm_password: signUpData.confirm_password
      });
  
      if (response.status === 201) {
        setOpenOTPSection(true);
        setStartCountdown(true);
      }
    } catch (error) {
      console.error("Signup failed: ", error.response);
      toast.error("Signup failed! Please check your details.");
    }
  };

  // Handle OTP submission to verify the account
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending OTP and email to verify the account
      const response = await axios.post("https://law-api.tecosys.ai/api/verify-otp/", {
        email: signUpData.email,
        otp: otp
      });

      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        navigate('/');  // Navigate to the home page after successful verification
      } else {
        toast.error("OTP verification failed!");
      }
    } catch (error) {
      console.error("OTP verification failed: ", error.response);
      toast.error("OTP verification failed!");
    }
  };

  // Countdown logic for OTP timer
  useEffect(() => {
    let timer;
    if (startCountdown && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startCountdown, timeLeft]);

  // Format time for the OTP countdown timer
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Submit sign-in data to the backend
  const handleSigninDataSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login data to backend
      const response = await axios.post("https://law-api.tecosys.ai/api/login/", {
        email: signInData.email,   // Backend expects `email`
        password: signInData.password  // Backend expects `password`
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);  // Store token in localStorage
        toast.success("Login successful!");
        navigate('/');  // Navigate to home page after login
      }
    } catch (error) {
      console.error("Login failed: ", error.response);
      toast.error("Login failed! Please check your credentials.");
    }
  };

  // Panel switch: sign up panel
  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  // Panel switch: sign in panel
  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  // Privacy Policy Modal toggle
  const handlePrivacyPolicy = () => {
    setOpenPrivacyPolicy(!openPrivacyPolicy);
  };

  return (
    <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
      <div className="form-container sign-up-container w-[400px] lg:w-1/2">
        <form className="dataSubmitForm" onSubmit={openOTPSection ? handleOtpSubmit : handleSignupDataSubmit}>
          {openOTPSection ? (
            <>
              <h1 className="h1Header">Email Verification</h1>
              <p style={{ color: 'white', padding: "10px", backgroundColor: "#3D3D3D", borderRadius: "5px", margin: '25px 0' }}>
                An OTP has been sent to your email {signUpData.email}. Please enter the OTP below to verify your account.
              </p>
              {startCountdown && timeLeft > 0 && (
                <p style={{ color: 'red', fontWeight: 'bold', marginBottom: "15px" }}>Time remaining: {formatTime(timeLeft)}</p>
              )}
              <MuiOtpInput value={otp} length={4} onChange={handleChange} sx={{
                input: {
                  color: 'black',
                  backgroundColor: 'white',
                  width: '2rem',
                  height: '2rem',
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  margin: '0.2rem',
                  border: '1px solid black',
                  borderRadius: '4px',
                },
              }} />
              <p style={{ color: 'white', padding: "10px", backgroundColor: "#3D3D3D", borderRadius: "5px", margin: "20px 0" }}>
                Didn't receive the OTP? Resend OTP
              </p>
              <button className="buttonClass" type="submit">Verify OTP</button>
            </>
          ) : (
            <>
              <h1 className="h1Header">Create Account</h1>
              <input className="inputClass w-full lg:w-4/5" name="name" value={signUpData.name} type="text" placeholder=" Enter your full name" onChange={handleSignUpDataChange} required />
              <input className="inputClass w-full lg:w-4/5" name="username" value={signUpData.username} type="text" placeholder=" Enter your username" onChange={handleSignUpDataChange} required />
              <input className="inputClass w-full lg:w-4/5" name="email" value={signUpData.email} type="email" placeholder="Enter your email address" onChange={handleSignUpDataChange} required />
              <div className="relative w-[370px] lg:w-full">
                <input className="inputClass" name="password" value={signUpData.password} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" onChange={handleSignUpDataChange} required />
                <IconButton onClick={togglePasswordVisibility} style={{ position: 'absolute', cursor: 'pointer', right: '60px', top: '50%', transform: 'translateY(-50%)' }}>
                  {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </div>
              {/* <div className="relative mb-2 w-[370px] lg:w-full">
                <input className="inputClass" name="confirm_password" value={signUpData.confirm_password} type={showRetypePassword ? 'text' : 'password'} placeholder="Confirm your password" onChange={handleRetypePasswordChange} required />
                <IconButton onClick={toggleRetypePasswordVisibility} style={{ position: 'absolute', cursor: 'pointer', right: '60px', top: '50%', transform: 'translateY(-50%)' }}>
                  {showRetypePassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </div> */}
              <div className="relative mb-2 w-[370px] lg:w-full">
                <input
                  className="inputClass"
                  name="confirm_password"
                  value={signUpData.confirm_password} // Bind value to the state
                  type={showRetypePassword ? 'text' : 'password'} // Control visibility with toggle
                  placeholder="Confirm your password"
                  onChange={(e) => setSignUpData({ ...signUpData, confirm_password: e.target.value })} // Update confirm_password state
                  style={{ width: '80%' }}
                  required
                />
                <IconButton
                  onClick={toggleRetypePasswordVisibility}
                  style={{ position: 'absolute', cursor: 'pointer', right: '60px', top: '50%', transform: 'translateY(-50%)', zIndex: '4', marginRight: '10px' }}>
                  {showRetypePassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </div>
              <button className="buttonClass font-medium w-[300px] lg:w-4/5" type="submit">Sign Up</button>
            </>
          )}
        </form>
      </div>

      <div className="form-container sign-in-container w-[400px] lg:w-1/2">
        <form className="dataSubmitForm" onSubmit={handleSigninDataSubmit}>
          <h1 className="h1Header">Log in into your account </h1>
          <input className="inputClass w-full lg:w-4/5" name="email" value={signInData.email} type="email" placeholder="Enter your email address" onChange={handleSignInDataChange} required />
          <div className="relative mb-2 w-full lg:w-4/5">
            <input className="inputClass w-full" name="password" value={signInData.password} type={showSignInPassword ? 'text' : 'password'} placeholder="Enter your password" onChange={handleSignInDataChange} required />
            <IconButton onClick={toggleSignInPasswordVisibility} style={{ position: 'absolute', cursor: 'pointer', right: '60px', top: '50%', transform: 'translateY(-50%)' }}>
              {showSignInPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          </div>
          <a href="/forget-password" style={{ fontSize: "16px", color: "white", marginBottom: "10px", fontWeight: '600' }}>Forgot password?</a>
          <button className="buttonClass font-medium w-[300px] lg:w-4/5" type="submit">Log In</button>
        </form>
      </div>

      <div className="overlay-container hidden lg:block">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="h1Header">Hello Friend !</h1>
            <p style={{ margin: "20px 0", fontWeight: 400, fontSize: 18 }}>Please provide the information to register your account.</p>
            <p style={{ marginBottom: "15px", fontWeight: 600, fontSize: 16 }}>Already have an account!</p>
            <button className="ghost" id="signIn" onClick={handleSignInClick} style={{ backgroundColor: 'rgb(79 70 229)' }}>Log In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="h1Header">Welcome Back !</h1>
            <p style={{ margin: "20px 0", fontWeight: 400, fontSize: 18 }}>Don’t have an account?</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick} style={{ backgroundColor: 'rgb(79 70 229)' }}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
