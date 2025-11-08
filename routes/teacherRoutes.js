import express from "express";
import { getTeacherClasses, setClassLocation } from "../controllers/teacherController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/classes", protect, getTeacherClasses);
router.post("/classes/set-location", protect, setClassLocation);
export default router;
