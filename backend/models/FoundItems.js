// models/FoundItem.js
import mongoose from "mongoose";

const foundItemSchema = new mongoose.Schema({
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
