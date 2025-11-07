import express from "express";
import { getClasses } from "../controllers/teacherController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/classes", protect, getClasses);
export default router;
