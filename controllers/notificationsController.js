import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({
      $or: [{ role: req.user.role }, { role: "all" }]
    }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotification = async (req, res) => {
  const { message, role } = req.body;
  try {
    const note = await Notification.create({ message, role });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
