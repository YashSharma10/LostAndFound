import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ncu from "../Assets/ncu.png";
import ncuDark from "../Assets/ncuDark.png";
import "../App.css";
import "./header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import axiosInstance from "./axios";

function Header() {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imgUrl, setImgUrl] = useState(ncu);
  const [userData, setUserData] = useState(null); // State for Google User Data

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    setImgUrl(isDarkMode ? ncuDark : ncu);
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

  const handleToggle = () => setToggle(!toggle);

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const loginwithgoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
  };

  const logoutGoogle = () => {
    window.open("http://localhost:6005/logout", "_self");
    setUserData(null);
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/login/success", {
        withCredentials: true,
      });
      setUserData(response.data.user);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="toggle-header">
        <div className="logo-mob">
          <Link to="/Home">
            <img alt="logo" src={imgUrl} className="logo-img-mob" />
          </Link>
        </div>

        <button className="toggler" onClick={handleToggle}>
          {toggle ? <FaTimes /> : <RxHamburgerMenu />}
        </button>
      </div>
      <header className={`page-header ${toggle ? "open" : ""}`}>
        <div className="logo">
          <Link to="/Home">
            <img alt="logo" src={imgUrl} className="logo-img" />
          </Link>
        </div>
        <nav className={`navbar ${toggle ? "open" : ""}`}>
          <Link to="/Home" onClick={() => setToggle(false)}>HOME</Link>
          <Link to="/Lostitm" onClick={() => setToggle(false)}>LOST ITEMS</Link>
          <Link to="/Founditm" onClick={() => setToggle(false)}>FOUND ITEMS</Link>
          <Link to="/Report" onClick={() => setToggle(false)}>REPORT</Link>
          <Link to="/Profile" onClick={() => setToggle(false)}>PROFILE</Link>
        </nav>
        <div className="switch-container">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <span className="balldark"></span>
          </label>
        </div>
        <div className="btns">
          {user || (userData && Object.keys(userData).length > 0) ? (
            <div className="dropdown">
              <button className="dropbtn">
                <img
                  width="35"
                  height="35"
                  src={userData ? userData.image : "https://img.icons8.com/ios-filled/50/gender-neutral-user.png"}
                  alt="Profile"
                />
                {userData ? userData.displayName : user.name}
              </button>
              <div className="dropdown-content">
                <Link to="/Profile" onClick={() => setToggle(false)}>
                  Profile
                </Link>
                <button onClick={userData ? logoutGoogle : handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <button className="login-with-google-btn" onClick={loginwithgoogle}>
              Sign In With Google
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
