import mongoose from 'mongoose';

const connectionString = 'mongodb://localhost:27017/yourdbname';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) { // 0: disconnected
      await mongoose.connect("mongodb+srv://yash22csu295:12345@lostandfound.wgyek.mongodb.net/?retryWrites=true&w=majority&appName=LostAndFound", {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
