import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Public info for auth routes
router.get("/", (req, res) => {
	res.json({
		message: "Auth endpoints",
		endpoints: {
			signup: "/api/auth/signup (POST)",
			login: "/api/auth/login (POST)"
		}
	});
});

router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;