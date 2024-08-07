import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  location: String,
  itemName: String,
  category: String,
  date: Date,
  description: String,
  images: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Add reference to User
});

const Lost = mongoose.model('Lost', reportSchema);
const Found = mongoose.model('Found', reportSchema);

export { Lost, Found };
