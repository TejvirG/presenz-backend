import express from "express";
import {
  getNotifications,
  createNotification
} from "../controllers/notificationsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
// Make notifications listing public (returns only 'all' notifications when unauthenticated)
router.get("/", getNotifications);
router.post("/", protect, adminOnly, createNotification);
export default router;
