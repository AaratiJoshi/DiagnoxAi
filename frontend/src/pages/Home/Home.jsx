import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const slides = [
    {
      image:
        "https://i.pinimg.com/736x/e7/d7/46/e7d746ec07c6ca98d4100b06044f8db2.jpg",
      title: "Brain Diagnosis",
      text: "AI-driven tools for early brain disease detection."
    },
    {
      image:
        "https://png.pngtree.com/thumb_back/fw800/background/20240527/pngtree-it-is-analyzed-with-a-diabetes-device-image_15827648.jpg",
      title: "Diabetes Care",
      text: "Accurate AI-based diabetes prediction and monitoring."
    },
    {
      image:
        "https://i.pinimg.com/736x/b6/96/ee/b696ee610d8aac5441d3d68cf64f6242.jpg",
      title: "Vision Assist",
      text: "Smart AI-powered assistance for vision health."
    },
    {
      image:
        "https://www.orangehealth.in/wp-content/uploads/2024/02/fb81787a9c.jpg",
      title: "Heart Health",
      text: "Make your heart healthy is our priority."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="app-container">
      {/* Hero Slider */}
      <section id="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Our Mission Section */}
      <section id="our-mission">
        <div className="mission-image">
          <img
            src="https://i.pinimg.com/736x/74/9c/45/749c4503c29aafb3b6b41d0f83f61e18.jpg"
            alt="AI Diagnosis"
          />
        </div>
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            <em>Because each and every life matters!</em>
          </p>
          <ul>
            <li>AI-driven early diagnosis for critical brain diseases.</li>
            <li>Smart algorithms that improve healthcare accessibility.</li>
            <li>Machine learning models for personalized treatment plans.</li>
            <li>AI-powered analysis to detect diabetes and neurological disorders.</li>
            <li>Vision enhancement using advanced AI recognition systems.</li>
            <li>Revolutionizing medical diagnostics through deep learning.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
