import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// POST /api/auth/signup
export const registerUser = async (req, res) => {
  try {
    console.log("Signup request received:", { ...req.body, password: "[REDACTED]" });
    
    const { name, email, password, role } = req.body;

    // Basic validation with detailed errors
    if (!name || !email || !password || !role) {
      console.log("Missing fields:", { 
        name: !name, 
        email: !email, 
        password: !password, 
        role: !role 
      });
      return res.status(400).json({ 
        error: "Please fill all fields",
        missing: Object.entries({ name, email, password, role })
          .filter(([_, v]) => !v)
          .map(([k]) => k)
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User exists with email:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    // Normalize role to Title Case
    const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    console.log("Role normalized:", { original: role, normalized: normalizedRole });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with normalized role
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
    });

    console.log("User created successfully:", { 
      id: newUser._id, 
      email: newUser.email, 
      role: newUser.role 
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    console.error("Signup error:", err);
    // Send more detailed error for debugging
    res.status(500).json({ 
      error: "Server error during signup",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};
