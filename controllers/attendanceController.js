import Attendance from "../models/Attendance.js";
import Class from "../models/Class.js";

export const markAttendance = async (req, res) => {
  const { classId, status, location } = req.body;
  try {
    const record = await Attendance.create({
      user: req.user._id,
      classId,
      status,
      location
    });
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user._id }).populate("classId");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ classId: req.params.id }).populate("user");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
