import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import PrivacyPolicyModal from "../../CommonFiles/PrivacyPolicyModal";
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { MuiOtpInput } from 'mui-one-time-password-input'
import IconButton from '@mui/material/IconButton';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const LoginPage = () => {
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });
  const [signUpData, setSignUpData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [openOTPSection, setOpenOTPSection] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);  // 2 minutes in seconds
  const [startCountdown, setStartCountdown] = useState(false);
  const [otp, setOtp] = useState('');
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Toggle function for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRetypePasswordVisibility = () => {
    setShowRetypePassword(!showRetypePassword);
  };

  const toggleSignInPasswordVisibility = () => {
    setShowSignInPassword(!showSignInPassword);
  };
  
  // Handle input data changes
  const handleSignInDataChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUpDataChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  // Handle retype password change and validate passwords
  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
    validatePasswords(signUpData.password, e.target.value);
  };

  // Validate that both passwords match
  const validatePasswords = (password, retypePassword) => {
    if (retypePassword === '') {
      setPasswordMatch(null);
    } else if (password === retypePassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  // Submit sign-up data
  const handleSignupDataSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("https://law-api.tecosys.ai/api/register/", {
        name: signUpData.name,
        username: signUpData.username,
        email: signUpData.email,
        password: signUpData.password,
        confirm_password: signUpData.confirm_password
      });

      if (response.status === 201) {
        setOpenOTPSection(true);
        setStartCountdown(true);
        toast.success("OTP sent to your email.");
      }
    } catch (error) {
      toast.error("Signup failed! Please check your details.");
    }
  };

  // Submit OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://law-api.tecosys.ai/api/verify-otp/", {
        email: signUpData.email,
        otp: otp
      });
      
      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        navigate('/');
      } else {
        toast.error("OTP verification failed!");
      }
    } catch (error) {
      toast.error("OTP verification failed!");
    }
  };

  // Countdown logic
  useEffect(() => {
    let timer;
    if (startCountdown && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);  // Clear timer on component unmount
  }, [startCountdown, timeLeft]);

  // Format time for display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Submit sign-in data
  const handleSigninDataSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://law-api.tecosys.ai/api/login/", {
        email: signInData.email,
        password: signInData.password
      });
      if (response.status === 200) {
        const { token } = response.data;

        // Store token in localStorage
        localStorage.setItem("token", token);
        toast.success("Login successful!");
        navigate('/');
      }
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
    }
  };

  // Handle panel switching
  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  // Handle privacy policy toggle
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
                }
              }}/>
              <p style={{ color: 'white', padding: "10px", backgroundColor: "#3D3D3D", borderRadius: "5px", margin: "20px 0" }}>Didn't receive the OTP? Resend OTP</p>
              <button className="buttonClass" type="submit">Verify OTP</button>
            </>
          ) : (
            <>
              <h1 className="h1Header">Create Account</h1>
              <input className="inputClass w-full lg:w-4/5" name="name" value={signUpData.name} type="text" placeholder="Enter your full name" onChange={handleSignUpDataChange} required />
              <input className="inputClass w-full lg:w-4/5" name="username" value={signUpData.username} type="text" placeholder="Enter your username" onChange={handleSignUpDataChange} required />
              <input className="inputClass w-full lg:w-4/5" name="email" value={signUpData.email} type="email" placeholder="Enter your email address" onChange={handleSignUpDataChange} required />
              <div className="relative w-[370px] lg:w-full">
                <input className="inputClass" name="password" value={signUpData.password} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" onChange={handleSignUpDataChange} required />
                <IconButton onClick={togglePasswordVisibility} style={{ position: 'absolute', cursor: 'pointer', right: '60px', top: '50%', transform: 'translateY(-50%)' }}>
                  {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </div>
              <div className="relative mb-2 w-[370px] lg:w-full">
                <input className="inputClass" name="confirm_password" value={signUpData.confirm_password} type={showRetypePassword ? 'text' : 'password'} placeholder="Confirm your password" onChange={handleSignUpDataChange} required />
                <IconButton onClick={toggleRetypePasswordVisibility} style={{ position: 'absolute', cursor: 'pointer', right: '60px', top: '50%', transform: 'translateY(-50%)' }}>
                  {showRetypePassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </div>
              <button className="buttonClass font-medium w-[300px] lg:w-4/5" type="submit">Sign Up</button>
              <div className="flex mt-2 text-white font-medium gap-2 lg:hidden">
                <p>Already have an account?</p>
                <button id="signIn" onClick={handleSignInClick} style={{ backgroundColor: 'rgb(79 70 229)' }}>
                  Log In
                </button>
              </div>
              <p style={{ margin: "12px 0", color: "white", fontSize: "12px", marginTop: '20px' }}>
                By continuing, you agree to LawCrats’s Terms of Use. Read our <span onClick={handlePrivacyPolicy} style={{ cursor: "pointer", textDecorationLine: "underline" }}>Privacy Policy</span>.
              </p>
              <PrivacyPolicyModal open={openPrivacyPolicy} handleClose={handlePrivacyPolicy} />
            </>
          )}
        </form>
      </div>

      <div className="form-container sign-in-container w-[400px] lg:w-1/2">
        <form className="dataSubmitForm" onSubmit={handleSigninDataSubmit}>
          <h1 className="h1Header">Log in to your account</h1>
          <input className="inputClass w-full lg:w-4/5" name="email" value={signInData.email} type="email" placeholder="Enter your email address" onChange={handleSignInDataChange} required />
          <div className="relative mb-2 w-full lg:w-4/5">
            <input className="inputClass w-full" name="password" value={signInData.password} type={showSignInPassword ? 'text' : 'password'} placeholder="Enter your password" onChange={handleSignInDataChange} required />
            <IconButton onClick={toggleSignInPasswordVisibility} style={{ position: 'absolute', cursor: 'pointer', right: '60px', top: '50%', transform: 'translateY(-50%)' }}>
              {showSignInPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          </div>
          <a href="/forget-password" style={{ fontSize: "16px", color: "white", marginBottom: "10px", fontWeight: '600' }}>Forgot password?</a>
          <button className="buttonClass font-medium w-[300px] lg:w-4/5" type="submit">Log In</button>
          <div className="flex mt-2 text-white font-medium gap-2 lg:hidden">
            <p>Don't have an account?</p>
            <button id="signUp" className="underline" onClick={handleSignUpClick} style={{ backgroundColor: 'rgb(79 70 229)' }}>
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <div className="overlay-container hidden lg:block">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="h1Header">Hello Friend!</h1>
            <p>Please provide the information to register your account.</p>
            <p style={{ marginBottom: "15px", fontWeight: 600, fontSize: 16 }}>Already have an account!</p>
            <button className="ghost" id="signIn" onClick={handleSignInClick} style={{ backgroundColor: 'rgb(79 70 229)' }}>Log In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="h1Header">Welcome Back!</h1>
            <p>Don’t have an account?</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick} style={{ backgroundColor: 'rgb(79 70 229)' }}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
