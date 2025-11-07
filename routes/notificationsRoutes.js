import express from "express";
import {
  getNotifications,
  createNotification
} from "../controllers/notificationsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protect, getNotifications);
router.post("/", protect, adminOnly, createNotification);
export default router;
