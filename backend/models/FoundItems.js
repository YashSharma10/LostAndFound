import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const foundItemSchema = new mongoose.Schema({
  uniqueId: { type: String, default: uuidv4 }, // Unique ID for the item
  location: { type: String, required: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    default: "unclaimed",
    enum: ["unclaimed", "claimed"],
  },
  images: [{ type: String }], // Array of image URLs
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const FoundItem = mongoose.model("FoundItem", foundItemSchema);

export default FoundItem;
