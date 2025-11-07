import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);  // SIGN UP
router.post("/login", loginUser);        // SIGN IN
router.get("/profile", protect, getProfile); // Protected route example

export default router;
