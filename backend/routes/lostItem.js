import express from "express";
import LostItem from "../models/LostItem.js";
import { ensureAuthenticated } from "../middlewares/auth.js"; // Create a middleware to check authentication

const router = express.Router();

// Route to submit a lost item report
import cloudinary from "../utils/cloudinary.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // Temporary storage for image uploads

// Route to submit a found item report
router.post(
  "/",
  ensureAuthenticated,
  upload.array("images"),
  async (req, res) => {
    const { location, itemName, category, date, description, status } =
      req.body;
    const images = req.files; // Access uploaded files

    try {
      const imageUrls = [];

      // Upload images to Cloudinary
      for (const image of images) {
        const result = await cloudinary.uploader.upload(image.path);
        imageUrls.push(result.secure_url);
      }

      const lostItem = new LostItem({
        location,
        itemName,
        category,
        date,
        description,
        status,
        images: imageUrls, // Store Cloudinary URLs in the database
        user: req.user._id,
      });

      await lostItem.save();
      res.status(200).json({ message: "Found item reported successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error reporting found item" });
    }
  }
);

// Route to get all lost items
router.get("/", async (req, res) => {
  // console.log("Frontedn daas");
  try {
    const lostItems = await LostItem.find().populate("user");
    res.status(200).json(lostItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lost items" });
  }
});

router.put("/itemId", ensureAuthenticated, async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;
    const userEmail = req.user.email;

    // console.log(id, userEmail, userId);
    const item = await LostItem.findById(id);
    // console.log(item, item.location);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update the status to "claimed" and store the user email
    item.status = "claimed";
    item.claimedBy = req.user.displayName;
    item.email = userEmail;
    await item.save();

    res.status(201).json({ message: "Item claimed successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Error claiming item", error });
  }
});

export default router;
