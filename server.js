import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
// import other routes... (attendance, teacher, admin, etc.)

dotenv.config();
const app = express();

// CORS configuration for Render deployment
const corsOptions = {
  origin: ['http://localhost:3000', 'https://presenz-frontend.vercel.app', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

// ✅ connect to MongoDB
connectDB();

// Root route returns API info
app.get("/", (req, res) => {
  res.json({
    name: "Presenz Backend API",
    status: "running",
    version: "1.0.0",
    endpoints: ["/api/auth/signup", "/api/auth/login"]
  });
});

// API root shows available routes
app.get("/api", (req, res) => {
  res.json({
    status: "ok",
    routes: {
      auth: {
        signup: "POST /api/auth/signup",
        login: "POST /api/auth/login"
      },
      health: "GET /api/health"
    }
  });
});

// Health check endpoint for Render
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "Presenz backend running fine ✅",
    env: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
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
