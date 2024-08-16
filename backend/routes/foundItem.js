import express from "express";
import FoundItem from "../models/FoundItems.js";
import { ensureAuthenticated } from "../middlewares/auth.js"; // Create a middleware to check authentication

const router = express.Router();

// Route to submit a found item report
import cloudinary from "../utils/cloudinary.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // Temporary storage for image uploads

// Route to submit a found item report
router.post(
  "/",
  ensureAuthenticated,
  upload.array("images"),
  async (req, res) => {
    const { location, itemName, category, date, description,status } = req.body;
    const images = req.files; // Access uploaded files

    try {
      const imageUrls = [];

      // Upload images to Cloudinary
      for (const image of images) {
        const result = await cloudinary.uploader.upload(image.path);
        imageUrls.push(result.secure_url);
      }

      const foundItem = new FoundItem({
        location,
        itemName,
        category,
        date,
        description,
        status,
        images: imageUrls, // Store Cloudinary URLs in the database
        user: req.user._id,
      });

      await foundItem.save();
      res.status(200).json({ message: "Found item reported successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error reporting found item" });
    }
  }
);

// Route to get all found items
router.get("/", async (req, res) => {
  try {
    const foundItems = await FoundItem.find().populate("user");
    res.status(200).json(foundItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching found items" });
  }
});

router.put("/itemId", ensureAuthenticated, async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;
    const userEmail = req.user.email;

    // console.log(id, userEmail, userId);
    const item = await FoundItem.findById(id);
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
