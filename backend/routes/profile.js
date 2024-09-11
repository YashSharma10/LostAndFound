// routes/user.js

import express from "express";
import User from "../models/User";

const router = express.Router();

// Route to get the logged-in user's data
router.get("/profile", async (req, res) => {
  console.log("Google UserData",req.body);
  
  try {
    const userId = req.user._id; // Assuming user ID is stored in the session or JWT
    const user = await User.findById(userId).populate("reports"); // Populate reports if necessary

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
});

export default router;
