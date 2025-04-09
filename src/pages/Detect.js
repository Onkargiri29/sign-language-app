import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Detect.css";

const Detect = () => {
  const [showFeed, setShowFeed] = useState(false);
  const [prediction, setPrediction] = useState("");
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const handleStart = () => {
    setShowFeed(true);
    startWebcam();
  };

  const handleStop = async () => {
    setShowFeed(false);
    stopWebcam();
    try {
      await axios.post("https://sign-language-app-c1s1.onrender.com/stop_feed");
    } catch (error) {
      console.error("Error stopping camera:", error);
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      // Start prediction loop
      intervalRef.current = setInterval(captureAndPredict, 2000);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopWebcam = () => {
    clearInterval(intervalRef.current);
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    videoRef.current.srcObject = null;
    setPrediction("");
  };

  const captureAndPredict = async () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageBase64 = canvas.toDataURL("image/jpeg");

    try {
      const response = await axios.post("https://sign-language-app-c1s1.onrender.com/predict", {
        image: imageBase64,
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  return (
    <div className="detect-page">
      <h2 className="detect-title">Sign Language Detection</h2>

      <div className="detect-container">
        {/* Live webcam preview */}
        <div className="video-section">
          <div className="video-container">
            {showFeed ? (
              <video ref={videoRef} autoPlay playsInline className="webcam-video" />
            ) : (
              <p>Click Start Detection to begin</p>
            )}
          </div>

          {/* Prediction Output */}
          {showFeed && (
            <div className="prediction-box">
              <h3>Predicted Sign:</h3>
              <p>{prediction || "Detecting..."}</p>
            </div>
          )}

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

        {/* Static chart */}
        <div className="reference-section">
          <h3>Reference: Sign Language Alphabet</h3>
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
