import React from "react";
import "./HomeFooter.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const HomeFooter = ({ isDarkMode }) => {
  return (
    <div className={`footer ${isDarkMode ? "dark" : ""} `}>
      <div className="footer_top ">
        <div className="left_footer">
          <div className="lo">
            {/* <img src={image2} alt="" /> */}
            <p>Tecosys</p>
          </div>
          <div className="form">
            <p>Subscribe to Our Newsletter</p>
            <div className="form1">
              <input type="text" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>

          <div className="icons">
            <div className="face">
              <a href="/" className="icon-a">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
            <div className="face">
              <a href="/" className="icon-a">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
            <div className="face">
              <a href="/" className="icon-a">
                <i className="fa-brands fa-behance"></i>
              </a>
            </div>
            <div className="face">
              <a href="/" className="icon-a">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="right_footer">
          <div>
            <h4>Navigation</h4>
            <a href="/">Home</a>
            <a href="https://www.tecosys.in/" target="_blank">About Us</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of service</a>
            <a href="/">Cookie Policy</a>
          </div>
          <div className="div4  sm:mt-[-60px]  lg:mt-[0px]">
            <h4>Contact</h4>
            <a href="/">
              <i className="fa-solid fa-phone"></i>+(91) 9748567677
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@tecosys.in" target="_blank" rel="noopener noreferrer">
              <i className="fa-regular fa-envelope"></i> info@tecosys.in
            </a>
            <a href="https://www.linkedin.com/company/tecosysin/" target="_blank">
              <i className="fa-solid fa-location-dot">
              </i>
              @LinkedIn<LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="footer_bottom2 mt-[-30px] lg:mt-[20px] text-[15px] lg:text-[18px]">
        <p>
          We empower AI to bridge the gap between law and rights.
          Please note, that we are not a law firm.
        </p>
      </div>
      <div className="footer_bottom sm:mt-[20px] ">
        <p>© 2024 Tecosys Law All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default HomeFooter;
