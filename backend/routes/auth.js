import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .notEmpty()
      .withMessage("Password must be at least 6 characters long"),
    body("role").notEmpty().withMessage("Role is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      req.session.user = user;
      res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// TO GET USER DATA
// middleware
const checkAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    req.userEmail = req.session.user.email;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/getdata", checkAuth, async (req, res) => {
  const userEmail = req.userEmail;

  try {
    const user = await User.findOne({ email: userEmail }).populate('posts');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User data fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


export default router;
