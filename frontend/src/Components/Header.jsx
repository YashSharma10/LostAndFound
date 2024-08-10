import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ncu from "../Assets/ncu.png";
import ncuDark from "../Assets/ncuDark.png";
import "../App.css";
import "./header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import axiosInstance from "./axios";

function Header() {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imgUrl, setImgUrl] = useState(ncu);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setToggle(window.innerWidth > 900);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleToggle = () => setIsDarkMode(!isDarkMode);

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
      <div className="toogle-header">
        <RxHamburgerMenu
          className="toggler"
          onClick={() => setToggle(!toggle)}
        />
      </div>
      <header
        className="page-header"
        style={toggle ? { display: "flex" } : { display: "none" }}
      >
        <div className="logo">
          <Link to="/Home">
            <img alt="logo" src={imgUrl} className="logo-img" />
          </Link>
        </div>
        <div className="head">
          <nav className="navbar">
            <Link to="/Home" onClick={() => setToggle(false)}>
              HOME
            </Link>
            <Link to="/Lostitm" onClick={() => setToggle(false)}>
              LOST ITEMS
            </Link>
            <Link to="/Founditm" onClick={() => setToggle(false)}>
              FOUND ITEMS
            </Link>
            <Link to="/Report" onClick={() => setToggle(false)}>
              REPORT
            </Link>
            <Link to="/Profile" onClick={() => setToggle(false)}>
              Profile
            </Link>
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
                <Link to="/Profile" onClick={() => setToggle(false)}>
                  Profile
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <h1>
              <Link to="/LoginForm" onClick={() => setToggle(false)}>LOGIN</Link>
            </h1>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
