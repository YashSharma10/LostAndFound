import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  image: String,
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }], // Optional: if you want to link reports directly to users
});

export default mongoose.model("User", userSchema);
