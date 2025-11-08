import express from "express";
import { getTeacherClasses } from "../controllers/teacherController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/classes", protect, getTeacherClasses);
export default router;
