import ClassModel from "../models/ClassModel.js";

export const getTeacherClasses = async (req, res) => {
  try {
    // Get classes for the logged-in teacher
    const classes = await ClassModel.find({ teacher: req.user._id })
      .select('-teacher') // Exclude teacher field from response
      .sort({ createdAt: -1 });
    res.json(classes);
  } catch (err) {
    console.error('Error in getTeacherClasses:', err);
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};

export const createClass = async (req, res) => {
  try {
    const { subject, semester, studentsCount } = req.body;
    
    if (!subject || !semester) {
      return res.status(400).json({ message: "Subject and semester are required" });
    }

    const newClass = await ClassModel.create({
      subject,
      semester,
      studentsCount: studentsCount || 0,
      teacher: req.user._id
    });

    res.status(201).json(newClass);
  } catch (err) {
    console.error('Error in createClass:', err);
    res.status(500).json({ message: "Failed to create class" });
  }
};

export const setClassLocation = async (req, res) => {
  try {
    const { classId, latitude, longitude } = req.body;
    
    if (!classId || !latitude || !longitude) {
      return res.status(400).json({ message: "Class ID, latitude, and longitude are required" });
    }

    // Ensure the class belongs to the teacher
    const cls = await ClassModel.findOneAndUpdate(
      { _id: classId, teacher: req.user._id },
      { latitude, longitude },
      { new: true }
    );

    if (!cls) {
      return res.status(404).json({ message: "Class not found or unauthorized" });
    }

    res.json(cls);
  } catch (err) {
    console.error('Error in setClassLocation:', err);
    res.status(500).json({ message: "Failed to update class location" });
  }
};
