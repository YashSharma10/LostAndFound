import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  location: { type: String, required: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    default: "unclaimed",
    enum: ["unclaimed", "claimed", "returned"]
  },
  images: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Lost = mongoose.model('Lost', reportSchema);
const Found = mongoose.model('Found', reportSchema);

export { Lost, Found };
