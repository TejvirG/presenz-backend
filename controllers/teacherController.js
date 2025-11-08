import ClassModel from "../models/ClassModel.js";

export const getTeacherClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const setClassLocation = async (req, res) => {
  try {
    const { subject, latitude, longitude } = req.body;
    if (!subject || !latitude || !longitude) {
      return res.status(400).json({ message: "Incomplete data" });
    }

    const cls = await ClassModel.findOneAndUpdate(
      { subject },
      { latitude, longitude },
      { upsert: true, new: true }
    );
    res.json(cls);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
