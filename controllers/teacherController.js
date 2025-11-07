import Class from "../models/Class.js";

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({ teacher: req.user._id });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
