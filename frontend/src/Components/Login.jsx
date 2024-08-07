import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateSignUp = () => {
    const { name, email, password, role } = formData;
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    if (role !== "user" && role !== "admin") {
      toast.error("Please select a valid role.");
      return false;
    }
    return true;
  };

  const validateSignIn = () => {
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      toast.success(response.data.message);
      clearForm();
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn()) return;

    try {
      const response = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      toast.success(response.data.message);
      navigate("/Home"); // Redirect to the home page on successful login
    } catch (error) {
      console.error("Signin error:", error);
      toast.error(error.response?.data?.message || "Signin failed");
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  return (
    <div className="Login-Form">
      <ToastContainer />
      <div
        className={`container-log ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container-log"
      >
        {/* Sign-Up Form */}
        <div className="form-container-log sign-up-container-log">
          <form className="logform" onSubmit={handleSignUp}>
            <div className="head1">Create Account</div>
            <div className="social-container-log">
              <a href="#" className="social-log links">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-log links">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social-log links">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="span">or use your email for registration</span>
            <input
              className="loginput"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="loginput"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="loginput"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="role-select">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
                <span>User</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                />
                <span>Admin</span>
              </label>
            </div>
            <button className="log">Sign Up</button>
          </form>
        </div>
        {/* Sign-In Form */}
        <div className="form-container-log sign-in-container-log">
          <form className="logform" onSubmit={handleSignIn}>
            <div className="head1">Sign in</div>
            <div className="social-container-log">
              <a href="#" className="social-log links">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-log links">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social-log links">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="span">or use your account</span>
            <input
              className="loginput"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="loginput"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <a href="#" className="links">
              Forgot your password?
            </a>
            <button className="log">Sign In</button>
          </form>
        </div>
        {/* Overlay */}
        <div className="overlay-container-log">
          <div className="overlay-log">
            <div className="overlay-panel-log overlay-left-log">
              <h1 className="headnew">Welcome Back!</h1>
              <p className="login">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost-log"
                id="signIn"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel-log overlay-right-log">
              <h1 className="headnew">Hello, Friend!</h1>
              <p className="login">
                Enter your personal details and start journey with us
              </p>
              <button
                className="ghost-log"
                id="signUp"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
