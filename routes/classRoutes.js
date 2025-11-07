import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { setClassLocation, getClasses } from "../controllers/classController.js";

const router = express.Router();
router.post("/set-location", protect, setClassLocation);
router.get("/", protect, getClasses);
export default router;