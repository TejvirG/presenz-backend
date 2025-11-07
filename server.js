import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
// import other routes... (attendance, teacher, admin, etc.)

dotenv.config();
const app = express();

// CORS configuration
const corsOptions = {
  origin: '*',  // or your specific frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
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

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Server error", 
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred' 
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
