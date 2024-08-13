import mongoose from 'mongoose';

const lostItemSchema = new mongoose.Schema({
  location: String,
  itemName: String,
  category: String,
  date: Date,
  description: String,
  images: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
});

export default mongoose.model('LostItem', lostItemSchema);
