import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Debug: list available auth routes (helps confirm router mounting)
router.get("/", (req, res) => {
	res.json({
		message: "Auth routes mounted",
		routes: ["POST /api/auth/signup", "POST /api/auth/login", "POST /auth/signup", "POST /auth/login"]
	});
});

router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;
