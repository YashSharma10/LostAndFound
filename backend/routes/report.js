import express from "express";
import { Lost, Found } from "../models/report.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/lost", async (req, res) => {
  const { location, itemName, category, date, description, status, images } = req.body;

  try {
    const newLostItem = new Lost({
      location,
      itemName,
      category,
      date,
      description,
      status,
      images,
      user: req.userId // Save the user ID
    });

    await newLostItem.save();
    res.status(201).json({ message: "Lost item reported successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/found", async (req, res) => {
  const { location, itemName, category, date, description, status, images } = req.body;

  try {
    const newFoundItem = new Found({
      location,
      itemName,
      category,
      date,
      description,
      status,
      images,
      user: req.userId // Save the user ID
    });

    await newFoundItem.save();
    res.status(201).json({ message: "Found item reported successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/lost", async (req, res) => {
  try {
    const lostItems = await Lost.find().populate('user', 'name email');
    res.status(200).json(lostItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/found", async (req, res) => {
  try {
    const foundItems = await Found.find().populate('user', 'name email');
    res.status(200).json(foundItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
