import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ncu from "../Assets/ncu.png";
import ncuDark from "../Assets/ncuDark.png"; // Import the dark mode logo
import "../App.css";
import "./header.css";
import ToggleSwitch from "./ToggleSwitch";
import axiosInstance from "./axios"; // Import axios instance

function Header() {
  const [user, setUser] = useState(null); // User state, initially null
  const [isDarkMode, setIsDarkMode] = useState(false); // Light mode by default
  const [imgUrl, setImgUrl] = useState(ncu);

  useEffect(() => {
    const bodyClass = document.body.classList;
    if (isDarkMode) {
      bodyClass.add("dark");
      setImgUrl(ncuDark);
    } else {
      bodyClass.remove("dark");
      setImgUrl(ncu);
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Fetch user data if logged in
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/auth/getdata");
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <header className="page-header">
        <div className="logo">
          <Link to="/Home">
            <img alt="logo" src={imgUrl} className="logo-img" />
          </Link>
        </div>
        <div className="head">
          <nav className="navbar">
            <Link to="/Home">HOME</Link>
            <Link to="/Lostitm">LOST ITEMS</Link>
            <Link to="/Founditm">FOUND ITEMS</Link>
            <Link to="/Report">REPORT</Link>
            <Link to="/Profile">Profile</Link>
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
          <label htmlFor="checkbox" className="checkbox-label">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <span className="balldark"></span>
          </label>
        </div>
        <div className="btns">
          {user ? (
            <div className="dropdown">
              <button className="dropbtn">
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/ios-filled/50/gender-neutral-user.png"
                  alt="Profile"
                />
                {user.name}
              </button>
              <div className="dropdown-content">
                <Link to="/Profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <h1><Link to="/LoginForm">LOGIN</Link></h1>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
