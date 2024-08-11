import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ncu from "../Assets/ncu.png";
import ncuDark from "../Assets/ncuDark.png"; // Import the dark mode logo
import "../App.css";
import "./header.css";
import ToggleSwitch from "./ToggleSwitch";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import axiosInstance from "./axios"; // Import axios instance

function Header() {
  const [userData, setUserData] = useState(null);
  const getUser = async () => {
    try {
      const response = await axios
        .get("http://localhost:6005/login/sucess", {
          withCredentials: true,
        })
        .then((res) => {
          setUserData(res.data.user);
        });

      } catch (error) {
        console.log("error", error);
      }
    };
    
    console.log("Data", userData?Object.keys(userData):"Nothing");
  // logoout
  const logout = () => {
    window.open("http://localhost:6005/logout", "_self");
  };

  useEffect(() => {
    getUser();
  }, []);

  const loginwithgoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
  };

  // const onSuccess = (response) => {
  //   setUserData(response.profileObj);
  //   // Handle successful login, e.g., store user data, redirect
  // };

  // const onFailure = (error) => {
  //   console.error("Google Login Error:", error);
  //   // Handle login failure
  // };
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(null); // User state, initially null
  const [isDarkMode, setIsDarkMode] = useState(false); // Light mode by default
  const [imgUrl, setImgUrl] = useState(ncu);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    if (screenWidth > 900) {
      setToggle(true);
    } else setToggle(false);
    window.addEventListener("resize", handleResize);
  }, [window.innerWidth, toggle]);

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

  // useEffect(() => {
  //   // Fetch user data if logged in
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axiosInstance.get("/auth/getdata");
  //       setUser(response.data.user);
  //     } catch (error) {
  //       console.error("Failed to fetch user data:", error);
  //       setUser(null);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // const handleLogout = async () => {
  //   try {
  //     await axiosInstance.get("/auth/logout");
  //     setUser(null);
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
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
            <Link to="/Home" onClick={() => setToggle(!toggle)}>
              HOME
            </Link>
            <Link to="/Lostitm" onClick={() => setToggle(!toggle)}>
              LOST ITEMS
            </Link>
            <Link to="/Founditm" onClick={() => setToggle(!toggle)}>
              FOUND ITEMS
            </Link>
            <Link to="/Report" onClick={() => setToggle(!toggle)}>
              REPORT
            </Link>
            <Link to="/Profile" onClick={() => setToggle(!toggle)}>
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
          {/* <div>
            {user ? (
              <div>
                <img src={userData.imageUrl} alt="User" />
                <h2>{userData.name}</h2>
              </div>
            ) : (
              <GoogleLogin
                clientId="YOUR_CLIENT_ID"
                onSuccess={onSuccess}
                onFailure={onFailure}
              />
            )}
          </div> */}
          <button className="login-with-google-btn" style={userData?{display:"none"}:null} onClick={loginwithgoogle}>
            Sign In With Google
          </button>
          {userData?Object?.keys(userData)?.length > 0 ? (
            <>
              <li style={{ color: "black", fontWeight: "bold" }}>
                {userData?.displayName}
              </li>
              <li onClick={logout}>Logout</li>
              <li>
                <img
                  src={userData?.image}
                  style={{ width: "50px", borderRadius: "50%" }}
                  alt=""
                />
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ):null}
          {/* {user ? (
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
            <h1>
              <Link to="/LoginForm">LOGIN</Link>
            </h1>
          )} */}
        </div>
      </header>
    </div>
  );
}

export default Header;
