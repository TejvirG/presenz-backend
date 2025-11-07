import ClassModel from "../models/ClassModel.js";

export const setClassLocation = async (req, res) => {
  const { subject, latitude, longitude } = req.body;
  if (!subject || !latitude || !longitude)
    return res.status(400).json({ message: "Incomplete data" });

  const cls = await ClassModel.findOneAndUpdate(
    { subject },
    { latitude, longitude },
    { upsert: true, new: true }
  );
  res.json(cls);
};

export const getClasses = async (req, res) => {
  const classes = await ClassModel.find();
  res.json(classes);
};