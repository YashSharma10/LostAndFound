import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  displayName: String,
  googleId: String,
  email: { type: String, unique: true },
  image:String,
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lost" }], // Reference to posts
});

const User = mongoose.model("User", UserSchema);

export default User;
