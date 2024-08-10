import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ncu from "../Assets/ncu.png";
import ncuDark from "../Assets/ncuDark.png";
import "../App.css";
import "./header.css";
import axiosInstance from "./axios";

function Header() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imgUrl, setImgUrl] = useState(ncu);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="page-header">
      <div className="logo-container">
        <Link to="/Home">
          <img alt="logo" src={imgUrl} className="logo-img" />
        </Link>
      </div>
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <Link to="/Home" onClick={() => setMenuOpen(false)}>HOME</Link>
        <Link to="/Lostitm" onClick={() => setMenuOpen(false)}>LOST ITEMS</Link>
        <Link to="/Founditm" onClick={() => setMenuOpen(false)}>FOUND ITEMS</Link>
        <Link to="/Report" onClick={() => setMenuOpen(false)}>REPORT</Link>
        <Link to="/Profile" onClick={() => setMenuOpen(false)}>PROFILE</Link>
        {user ? (
          <>
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
                <Link to="/Profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </>
        ) : (
          <Link to="/LoginForm" onClick={() => setMenuOpen(false)}>LOGIN</Link>
        )}
      </nav>
      <div className="switch-container">
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
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? '✕' : '☰'}
      </button>
    </header>
  );
}

export default Header;
