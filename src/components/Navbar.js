// src/components/Navbar.js
import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "../assets/logo2.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo-container" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="logo-img" />
          <h2 className="logo-text">FingerTalk</h2>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {isHomePage ? (
            <>
              <li>
                <ScrollLink to="home" smooth duration={500} onClick={closeMenu}>
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="about" smooth duration={500} onClick={closeMenu}>
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="team" smooth duration={500} onClick={closeMenu}>
                  Our Team
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="contact" smooth duration={500} onClick={closeMenu}>
                  Contact
                </ScrollLink>
              </li>
            </>
          ) : (
            <li>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
          )}
          <li>
            <Link to="/detect" onClick={closeMenu}>
              Detect
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
