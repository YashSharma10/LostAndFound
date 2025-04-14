// Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ncu from "../Assets/ncu.png";
import ncuDark from "../Assets/ncuDark.png";
import "../App.css";
import "./header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContextProvider";
import { GoogleLogin } from "@react-oauth/google";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";


function Header() {
  const { globalBackendUrl } = useGlobalContext();
  const [toggle, setToggle] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imgUrl, setImgUrl] = useState(ncu);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    if (screenWidth > 900) setToggle(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenWidth]);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    setImgUrl(isDarkMode ? ncuDark : ncu);
  }, [isDarkMode]);

  const handleToggle = () => setIsDarkMode(!isDarkMode);

  const userProfile = async (data) => {
    try {
      await axios.post(`${globalBackendUrl}/user/profile`, data);
    } catch (error) {
      console.error("Error sending user profile data:", error);
    }
  };

  return (
    <div>
      <div className="toggle-header">
        <RxHamburgerMenu className="toggler" onClick={() => setToggle(!toggle)} />
      </div>
      <header className="page-header" style={{ display: toggle ? "flex" : "none" }}>
        <div className="logo">
          <Link to="/Home">
            <img alt="logo" src={imgUrl} className="logo-img" />
          </Link>
        </div>
        <div className="head">
          <nav className="navbar">
            <Link to="/Home" onClick={() => setToggle(!toggle)}>HOME</Link>
            <Link to="/Lostitm" onClick={() => setToggle(!toggle)}>LOST ITEMS</Link>
            <Link to="/Founditm" onClick={() => setToggle(!toggle)}>FOUND ITEMS</Link>
            <Link to="/Report" onClick={() => setToggle(!toggle)}>REPORT</Link>
            <Link to="/Profile" onClick={() => setToggle(!toggle)}>PROFILE</Link>
          </nav>
        </div>
        <div className="Switch">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={isDarkMode}
            onChange={handleToggle}
          />
          <label htmlFor="checkbox" className="checkbox-label" aria-label="Toggle dark mode">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <span className="balldark"></span>
          </label>
        </div>
        <div className="btns">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const userData = jwtDecode(credentialResponse.credential);
              userProfile(userData);
              console.log("Decoded Data:", userData);
            }}
            onError={() => console.log("Login Failed")}
          />
        </div>
      </header>
    </div>
  );
}

export default Header;
