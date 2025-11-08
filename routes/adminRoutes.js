import express from "express";
import { getReports } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
// Root info for admin routes
router.get("/", protect, adminOnly, (req, res) => {
	res.json({
		message: "Admin endpoints",
		endpoints: {
			reports: "/api/admin/reports (GET)"
		}
	});
});
router.get("/reports", protect, adminOnly, getReports);
export default router;
