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

// ✅ Health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Presenz backend running fine ✅" });
});

// ✅ Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
