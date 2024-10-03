import React, { useState } from "react";
import Slider from "react-slick";
import "./HomeTestimonial.css";
import image from "../assets/image.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";
import t4 from "../assets/t4.png";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import s1 from '../assets/s1.png';
import s2 from '../assets/s2.png';

import s3 from '../assets/s3.png';
import s4 from '../assets/s4.png';


const ltrSettings = {
  dots: false,
  infinite: true,
  speed: 5000,       // Slow continuous scroll
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  pauseOnHover: false,
};

const rtlSettings = {
  ...ltrSettings,     // Copy LTR settings
  rtl: true,          // Add the RTL property for right-to-left direction
};

const HomeTestimonial = ({ isDarkMode }) => {
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleInput = () => {
    setShowLoginMessage(true);
  };

  const handleBlur = () => {
    setShowLoginMessage(false);
  };

  const testimonials = [
    {
      text: "Lawcrats transformed my legal business with their intuitive platform.",
      name: "John Doe",
      image: image1,
      link: "#",
    },
    {
      text: "I was amazed by the ease of use and the efficiency of the Lawcrats platform.",
      name: "Jane Smith",
      image: image2,
      link: "#",
    },
    {
      text: "LawCrats gave me the tools to manage my cases more efficiently.",
      name: "Emily Johnson",
      image: image,
      link: "#",
    },
    {
      text: "Lawcrats transformed my legal business with their intuitive platform.",
      name: "John Doe",
      image: image1,
      link: "#",
    },
    {
      text: "I was amazed by the ease of use and the efficiency of the Lawcrats platform.",
      name: "Jane Smith",
      image: image2,
      link: "#",
    },
    {
      text: "LawCrats gave me the tools to manage my cases more efficiently.",
      name: "Emily Johnson",
      image: image,
      link: "#",
    },
  ];
return (
  <div className={`home-testimonial ${isDarkMode ? "dark-mode" : ""}`}>
    {/* Recent Case studies */}
    {/* <div className="recent-case-studies ml-[0px] md:mx-auto lg:text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center">Recent Case Studies</h2>
    </div> */}
    {/* <div className="ask-for-any-case w-[350px] lg:w-full h-[90px]  -ml-[30px]">
      <input
        type="text"
        placeholder="Ask for any case..."
        onInput={handleInput}
        onBlur={handleBlur}
      />
      <div className={`login-message ${showLoginMessage ? "active" : ""}`}>
        Please login first
      </div>
    </div> */}


    {/*<div className="feedback">
      <h3>Feedback from our users</h3>
    </div>

    <div className="testimonial-carousel">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`testimonial-card ${isDarkMode ? "dark-card" : ""}`}>
            <div className="new-visit">New Visit</div>
            <div className="quote-icon1">
              <FaQuoteLeft />
            </div>
            <p className="feedback-text">{testimonial.text}</p>
            <div className="quote-icon2">
              <FaQuoteRight />
            </div>
            <div className="card-footer">
              <div className="circle-image">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <div>
                <div className="name">{testimonial.name}</div>
                <a href={testimonial.link} className="visit-link">
                  Visit Lawyer
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>*/}

    <div className="parent-div text-2xl sm:text-3xl lg:text-4xl">
      <div className="button-div">Supported By</div>
    </div>
    <Slider {...ltrSettings} className="logo-container">
        <div className="logo-item">
          <img src={t1} alt="Logo 1" />
        </div>
        <div className="logo-item">
          <img src={t2} alt="Logo 2" />
        </div>
        <div className="logo-item">
          <img src={t3} alt="Logo 3" />
        </div>
        <div className="logo-item">
          <img src={t4} alt="Logo 4" />
        </div>
      </Slider>

      <div className="parent-div text-2xl sm:text-3xl lg:text-4xl" id="security-section">
      <div className="button-div ">Security & Compliances</div>
    </div>
    <Slider {...rtlSettings} className="logo-container">
        <div className="logo-item">
          <img src={s1} alt="Logo 1" />
        </div>
        <div className="logo-item">
          <img src={s2} alt="Logo 2" />
        </div>
        <div className="logo-item">
          <img src={s3} alt="Logo 3" />
        </div>
        <div className="logo-item">
          <img src={s4} alt="Logo 4" />
        </div>
      </Slider>


    </div>
  );
};

export default HomeTestimonial;
