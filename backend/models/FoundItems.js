import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const foundItemSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 }, // Unique ID for the item
  location: String,
  itemName: String,
  category: String,
  date: Date,
  description: String,
  status: {
    type: String,
    default: "unclaimed",
    enum: ["unclaimed", "claimed"],
  },
  images: [{ type: String }], // Array of image URLs
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  // Add these fields to your FoundItem and LostItem schemas
  claimedBy: { type: String, default: null },
  email: { type: String, default: null },
});

const FoundItem = mongoose.model("FoundItem", foundItemSchema);

export default FoundItem;
