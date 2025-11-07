import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
// Connect to DB early so failures appear in logs before server binds
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => res.send("Presenz backend running ✅"));

// ✅ Auth routes (must be before the catch-all 404)
app.use("/api/auth", authRoutes);

// ✅ Health endpoint with environment info
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "Presenz backend running fine ✅",
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    mongo: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// ✅ Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 10000;
const HOST = process.env.HOST || '0.0.0.0';  // Render needs 0.0.0.0

app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⚡️ Server running at http://${HOST}:${PORT}`);
  console.log('⚡️ Database: MongoDB connection active');
  console.log('⚡️ API endpoints:');
  console.log('   - GET  /api/health');
  console.log('   - POST /api/auth/signup');
  console.log('   - POST /api/auth/login');
});
