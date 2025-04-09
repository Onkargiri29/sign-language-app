import React, { useEffect } from "react";
import { FaHandsHelping } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  // Initialize scroll animation on mount
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Element name="home" className="hero-section">
        <div className="hero-content" data-aos="fade-up">
          <FaHandsHelping className="hero-icon" data-aos="zoom-in" />
          <h1>Welcome to FingerTalk: Where Gestures Become Words</h1>
          <p>
            Bridging the communication gap for the hearing and speech impaired using real-time AI-based gesture recognition.
            Our mission is to make technology inclusive and empowering for all.
          </p>

          {/* Navigation to Detect Page */}
          <Link to="/detect" className="start-button" data-aos="fade-up" data-aos-delay="300">
            Let’s Start
          </Link>
        </div>
      </Element>

      {/* About Section */}
      <Element name="about" className="about-section">
        <div className="about-content" data-aos="fade-up">
          <FcAbout className="about-icon" data-aos="zoom-in" data-aos-delay="200" />
          <h2>About Our Project</h2>
          <p>
            Our AI-powered system recognizes American Sign Language (ASL) signs through a webcam and translates them into text
            and audio. This helps children and individuals with hearing or speech impairments communicate with ease.
          </p>

          {/* Project Features */}
          <div className="features-section" data-aos="fade-up">
            <h3>Features</h3>

            <div className="feature-item">
              <h4>📘 What is Sign Language?</h4>
              <p>
                A visual-manual communication method using gestures, expressions, and body movement, typically used by the deaf and hard of hearing.
              </p>
            </div>

            <div className="feature-item">
              <h4>🎯 Project Objective</h4>
              <p>
                To build a real-time recognition system converting sign gestures to text and speech, enhancing accessibility.
              </p>
            </div>

            <div className="feature-item">
              <h4>🛠️ Technology Stack</h4>
              <p>
                <strong>Frontend:</strong> React.js |
                <strong> Backend:</strong> Flask |
                <strong> Language:</strong> Python |
                <strong> Libraries:</strong> TensorFlow, MediaPipe |
                <strong> Integration:</strong> OpenCV |
                <strong> Model:</strong> CNN
              </p>
            </div>

            <div className="feature-item">
              <h4>🌍 Applications</h4>
              <p>
                Useful in education, healthcare, and public services — enabling smooth interaction through gesture-to-speech translation.
              </p>
            </div>

            <div className="feature-item">
              <h4>💡 Impact</h4>
              <p>
                Empowers the speech/hearing impaired, drives inclusivity, and introduces an empathetic AI solution for communication.
              </p>
            </div>
          </div>
        </div>
      </Element>

      {/* Team Section */}
      <Element name="team" className="team-section">
        <div className="team-content" data-aos="fade-up">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member" data-aos="fade-up">
              <img src="/images/onkar_giri.jpg" alt="Onkar Giri" />
              <h4>Onkar M Giri</h4>
              <p>Model Creation & Integration</p>
            </div>
            <div className="team-member" data-aos="fade-up" data-aos-delay="100">
              <img src="/images/viraj_mulik.jpg" alt="Viraj Mulik" />
              <h4>Viraj Mulik</h4>
              <p>Frontend Developer</p>
            </div>
            <div className="team-member" data-aos="fade-up" data-aos-delay="200">
              <img src="/images/viraj_patole.jpg" alt="Viraj Patole" />
              <h4>Viraj Patole</h4>
              <p>Frontend Developer</p>
            </div>
            <div className="team-member" data-aos="fade-up" data-aos-delay="300">
              <img src="/images/harshvardhan_killedar.jpg" alt="Harshvardhan Killedar" />
              <h4>Harshvardhan Killedar</h4>
              <p>Documentation Head</p>
            </div>
          </div>
        </div>
      </Element>

      {/* Footer Section */}
      <footer className="footer" id="contact" data-aos="fade-up">
        <div className="footer-content">
          <p>© 2025 <strong>FingerTalk</strong>. All rights reserved.</p>
          <p>
            Email: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=team.fingertalk@gmail.com" target="_blank" rel="noopener noreferrer">team.fingertalk@gmail.com</a> |
            Phone: 9767122970
          </p>
          {/* Social Media Links */}
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/onkargiri29/" target="_blank" rel="noreferrer" title="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/Onkargiri29" target="_blank" rel="noreferrer" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.instagram.com/onkar_giri29/" target="_blank" rel="noreferrer" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
