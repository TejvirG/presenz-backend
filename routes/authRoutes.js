import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateSignupRequest, validateLoginRequest } from "../middleware/validateRequest.js";

const router = express.Router();

// Debug: list available auth routes (helps confirm router mounting)
router.get("/", (req, res) => {
  res.json({
    message: "Auth routes mounted",
    routes: ["POST /api/auth/signup", "POST /api/auth/login"]
  });
});

// Auth routes with validation
router.post("/signup", validateSignupRequest, registerUser);
router.post("/login", validateLoginRequest, loginUser);

export default router;