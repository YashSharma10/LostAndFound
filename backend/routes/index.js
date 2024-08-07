import express from "express";
import authRoutes from "./auth.js";
import reportRoutes from "./report.js";  // Add this line

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/reports", reportRoutes);  // Add this line

export default router;
