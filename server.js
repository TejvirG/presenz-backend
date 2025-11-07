import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
// import other routes... (attendance, teacher, admin, etc.)

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ connect to MongoDB
connectDB();

// ✅ test route for health
app.get("/", (req, res) => {
	res.send("Presenz Backend Running ✅");
});

// lightweight JSON health endpoint for uptime checks
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Presenz backend running fine ✅" });
});

// ✅ register routes
app.use("/api/auth", authRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/teacher", teacherRoutes);
// app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
