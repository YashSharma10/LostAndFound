// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import ncu from "../Assets/ncu.png";
// import ncuDark from "../Assets/ncuDark.png";
// import "../App.css";
// import "./header.css";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { FaTimes } from "react-icons/fa";
// import axiosInstance from "./axios";

// function Header() {
//   const [toggle, setToggle] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [imgUrl, setImgUrl] = useState(ncu);

//   useEffect(() => {
//     document.body.classList.toggle("dark", isDarkMode);
//     setImgUrl(isDarkMode ? ncuDark : ncu);
//   }, [isDarkMode]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axiosInstance.get("/auth/getdata");
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("Failed to fetch user data:", error.message);
//         setUser(null);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axiosInstance.get("/auth/logout");
//       setUser(null);
//     } catch (error) {
//       console.error("Logout failed:", error.message);
//     }
//   };

//   const loginWithGoogle = () => {
//     window.open("http://localhost:6005/auth/google/callback", "_self");
//   };

//   const logoutGoogle = () => {
//     window.open("http://localhost:6005/logout", "_self");
//   };

//   return (
//     <div>
//       <div className="toggle-header">
//         <div className="logo-mob">
//           <Link to="/Home">
//             <img alt="logo" src={imgUrl} className="logo-img-mob" />
//           </Link>
//         </div>
//         <button className="toggler" onClick={() => setToggle(!toggle)}>
//           {toggle ? <FaTimes /> : <RxHamburgerMenu />}
//         </button>
//       </div>
//       <header className={`page-header ${toggle ? "open" : ""}`}>
//         <div className="logo">
//           <Link to="/Home">
//             <img alt="logo" src={imgUrl} className="logo-img" />
//           </Link>
//         </div>
//         <nav className={`navbar ${toggle ? "open" : ""}`}>
//           <Link to="/Home" onClick={() => setToggle(false)}>HOME</Link>
//           <Link to="/Lostitm" onClick={() => setToggle(false)}>LOST ITEMS</Link>
//           <Link to="/Founditm" onClick={() => setToggle(false)}>FOUND ITEMS</Link>
//           <Link to="/Report" onClick={() => setToggle(false)}>REPORT</Link>
//           <Link to="/Profile" onClick={() => setToggle(false)}>PROFILE</Link>
//         </nav>
//         <div className="switch-container">
//           <input
//             type="checkbox"
//             className="checkbox"
//             id="checkbox"
//             checked={isDarkMode}
//             onChange={() => setIsDarkMode(!isDarkMode)}
//           />
//           <label htmlFor="checkbox" className="checkbox-label">
//             <i className="fas fa-moon"></i>
//             <i className="fas fa-sun"></i>
//             <span className="balldark"></span>
//           </label>
//         </div>
//         <div className="btns">
//           {user ? (
//             <div className="dropdown">
//               <button className="dropbtn">
//                 <img
//                   width="35"
//                   height="35"
//                   src={user.image || "https://img.icons8.com/ios-filled/50/gender-neutral-user.png"}
//                   alt="Profile"
//                 />
//                 {user.displayName || user.name}
//               </button>
//               <div className="dropdown-content">
//                 <Link to="/Profile" onClick={() => setToggle(false)}>
//                   Profile
//                 </Link>
//                 <button onClick={logoutGoogle}>Logout</button>
//               </div>
//             </div>
//           ) : (
//             <button className="login-with-google-btn" onClick={loginWithGoogle}>
//               Sign In With Google
//             </button>
//           )}
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Header;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ncu from "../Assets/ncu.png";
import ncuDark from "../Assets/ncuDark.png"; // Import the dark mode logo
import "../App.css";
import "./header.css";
import ToggleSwitch from "./ToggleSwitch";
import { RxHamburgerMenu } from "react-icons/rx";

import axiosInstance from "./axios"; // Import axios instance

function Header() {
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
  }, [window.innerWidth,toggle]);

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
            <h1>
              <Link to="/LoginForm">LOGIN</Link>
            </h1>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
