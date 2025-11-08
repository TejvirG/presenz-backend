import express from "express";
import { 
  getTeacherClasses, 
  setClassLocation, 
  createClass 
} from "../controllers/teacherController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Class routes
router.get("/classes", protect, getTeacherClasses);
router.post("/classes", protect, createClass);
router.post("/classes/:id/location", protect, setClassLocation);
export default router;
