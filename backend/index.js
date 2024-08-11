import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(6005, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed!!!", err);
  });
