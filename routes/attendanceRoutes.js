import express from "express";
import {
  markAttendance,
  getStudentAttendance,
  getClassAttendance
} from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/mark", protect, markAttendance);
router.get("/student/me", protect, getStudentAttendance);
router.get("/class/:id", protect, getClassAttendance);
export default router;
