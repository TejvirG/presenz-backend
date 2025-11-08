import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { registerUser, loginUser } from "./controllers/authController.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("Presenz backend running ✅"));

// API root - helpful for clients checking base /api path
app.get("/api", (req, res) => {
	res.json({
		message: "Presenz API",
		endpoints: {
			auth: {
				base: "/api/auth",
				signup: "/api/auth/signup",
				login: "/api/auth/login"
			},
			teacher: "/api/teacher",
			attendance: "/api/attendance",
			admin: "/api/admin",
			notifications: "/api/notifications"
		}
	});
});
// Health endpoint for monitoring
app.get("/api/health", (req, res) => {
	res.json({ status: "ok", uptime: process.uptime() });
});
// Ensure auth base info is available even if router not mounted
app.get('/api/auth', (req, res) => {
	res.json({
		message: 'Auth endpoints',
		endpoints: {
			signup: '/api/auth/signup (POST)',
			login: '/api/auth/login (POST)'
		}
	});
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationsRoutes);

// Catch-all
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);

	// Print mounted routes for easier debugging in Render logs
	try {
		const routes = [];
		app._router.stack.forEach((middleware) => {
			if (middleware.route) {
				// routes registered directly on the app
				const methods = Object.keys(middleware.route.methods).map(m => m.toUpperCase()).join(',');
				routes.push(`${methods} ${middleware.route.path}`);
			} else if (middleware.name === 'router' && middleware.handle && middleware.handle.stack) {
				// router middleware
				middleware.handle.stack.forEach((handler) => {
					if (handler.route) {
						const methods = Object.keys(handler.route.methods).map(m => m.toUpperCase()).join(',');
						// prefix with parent path if available
						const parentPath = middleware.regexp && middleware.regexp.source ? '' : '';
						routes.push(`${methods} ${handler.route.path}`);
					}
				});
			}
		});

		console.log('Mounted routes:');
		routes.forEach(r => console.log(' -', r));
	} catch (err) {
		console.error('Failed to list routes:', err);
	}
});
// Ensure auth base info is available even if router not mounted
app.get('/api/auth', (req, res) => {
	res.json({
		message: 'Auth endpoints',
		endpoints: {
			signup: '/api/auth/signup (POST)',
			login: '/api/auth/login (POST)'
		}
	});
});
// Also expose signup/login at app level to guarantee availability
app.post('/api/auth/signup', registerUser);
app.post('/api/auth/login', loginUser);