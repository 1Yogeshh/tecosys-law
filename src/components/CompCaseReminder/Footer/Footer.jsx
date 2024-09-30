import React from "react";
import "./Footer.css";
// import image2 from "../../assets/logo.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_top">
        <div className="left_footer">
          <div className="lo">
            {/* <img src={image2} alt="" /> */}
            <p>LawCrats</p>
          </div>
          <div className="form">
            <p>Subscribe to Our Newsletter</p>
            <div className="form1">
              <input type="text" placeholder="Your email" />
              <button>Subscribe</button>
            </div>
          </div>

          <div className="icons">
            <div className="face">
              <a href="/">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
            </div>
            <div className="face">
              <a href="/">
                <i class="fa-brands fa-instagram"></i>
              </a>
            </div>
            <div className="face">
              <a href="/">
                <i class="fa-brands fa-behance"></i>
              </a>
            </div>
            <div className="face">
              <a href="/">
                <i class="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="right_footer">
          <div>
            <h4>Navigation</h4>
            <a href="/">Home</a>
            {/* <a href="/">Shop</a> */}
            <a href="/">Collections</a>
            <a href="/"> About Us</a>
            <a href="/"> Contact Us</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of service</a>
            <a href="/">Return Policy</a>
            <a href="/">Cookie Policy</a>
          </div>
          <div className="div4">
            <h4>Contact</h4>
            <a href="/">
              <i class="fa-solid fa-phone"></i>+(123) 456-789{" "}
            </a>
            <a href="/">
              <i class="fa-regular fa-envelope"></i>support@Lawcrats.com
            </a>
            <a href="/">
              <i class="fa-solid fa-location-dot"></i>sdfghgfds
            </a>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <p>© 2024 LawCrats. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
