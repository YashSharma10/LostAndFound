
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import ncu from "../Assets/ncu.png";
import ncuDark from "../Assets/ncuDark.png"; // Import the dark mode logo
import "../App.css";
import "./header.css";
import ToggleSwitch from "./ToggleSwitch";
import { RxHamburgerMenu } from "react-icons/rx";

import axiosInstance from "./axios"; // Import axios instance
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContextProvider";

function Header() {
  const {globalBackendUrl} = useGlobalContext()
  console.log(globalBackendUrl);
  
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
    }
    // if (screenWidth<900 ) setToggle(false);
    window.addEventListener("resize", handleResize);
    console.log(toggle);
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

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [userdata, setUserdata] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/success", {
        withCredentials: true,
      });
      setUserdata(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };
  

  // logoout
  const logout = () => {
    window.open("http://localhost:6005/logout", "_self");
  };
  const loginwithgoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
  };
  useEffect(() => {
    getUser();
  }, []);
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
          {Object?.keys(userdata)?.length > 0 ? (
            <div className="google">
              <li style={{ color: "black", fontWeight: "bold" }}>
                {userdata?.displayName}
              </li>
              <button className="logout" onClick={logout}>
                Logout
              </button>
              <li>
                <img
                  src={userdata?.image}
                  style={{ width: "50px", borderRadius: "50%" }}
                  alt=""
                />
              </li>
            </div>
          ) : (
            <button
              onClick={loginwithgoogle}
              className="flex bg-gray-100 px-4 py-2 rounded-md gap-2 middle cursor-pointer"
            >
              <img
                width={20}
                src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                alt=""
              />
              <span> Sign in with Google</span>
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
