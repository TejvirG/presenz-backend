// Validation middleware for auth requests
export const validateSignupRequest = (req, res, next) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ 
      error: "Please fill all fields: name, email, password, role" 
    });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({
      error: "Please provide a valid email address"
    });
  }
  
  if (!["Student", "Teacher", "Admin"].includes(role)) {
    return res.status(400).json({ 
      error: "Invalid role. Must be Student, Teacher, or Admin" 
    });
  }
  
  next();
};

export const validateLoginRequest = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      error: "Email and password are required" 
    });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({
      error: "Please provide a valid email address"
    });
  }
  
  next();
};