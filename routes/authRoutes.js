import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateSignupRequest, validateLoginRequest } from "../middleware/validateRequest.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", validateSignupRequest, registerUser);

// POST /api/auth/login
router.post("/login", validateLoginRequest, loginUser);

export default router;
