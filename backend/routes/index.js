import express from "express";
import reportRoutes from "./report.js";  // Add this line

const router = express.Router();

router.use("/reports", reportRoutes);  // Add this line

export default router;
