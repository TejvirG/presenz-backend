import express from "express";
import { getReports } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/reports", protect, adminOnly, getReports);
export default router;
