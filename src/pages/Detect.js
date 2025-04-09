import React, { useState } from "react";
import axios from "axios";
import "./Detect.css"; // Styles for this component

const Detect = () => {
  const [showFeed, setShowFeed] = useState(false); // Toggles video stream visibility

  // Start webcam stream by displaying the video feed
  const handleStart = () => {
    setShowFeed(true);
  };

  // Stop webcam stream by calling backend endpoint
  const handleStop = async () => {
    try {
      await axios.post("https://sign-language-app-c1s1.onrender.com/stop_feed");
      setShowFeed(false);
    } catch (error) {
      console.error("Error stopping camera:", error);
    }
  };

  return (
    <div className="detect-page">
      <h2 className="detect-title">Sign Language Detection</h2>

      <div className="detect-container">
        {/* Live video stream section */}
        <div className="video-section">
          <div className="video-container">
            {showFeed ? (
              <img
                src="https://sign-language-app-c1s1.onrender.com/video_feed"
                alt="Sign Detection Feed"
                className="flask-video"
              />
            ) : (
              <p>Click Start Detection to begin</p>
            )}
          </div>

          {/* Start/Stop Detection Button */}
          <div className="button-group">
            {!showFeed ? (
              <button className="detect-button" onClick={handleStart}>
                Start Detection
              </button>
            ) : (
              <button className="detect-button stop" onClick={handleStop}>
                Stop Detection
              </button>
            )}
          </div>
        </div>

        {/* Static reference chart for user */}
        <div className="reference-section">
          <h3>Reference: Sign Language Alphabet (Right Hand)</h3>
          <img
            src="/images/sign_alphabet_chart.png"
            alt="Sign Chart"
            className="sign-chart"
          />
        </div>
      </div>
    </div>
  );
};

export default Detect;
