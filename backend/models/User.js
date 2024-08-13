import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  image: String,
});

const User = mongoose.model('User', userSchema);
export default User;
