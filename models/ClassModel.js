import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  subject: String,
  latitude: Number,
  longitude: Number
});

export default mongoose.model("Class", classSchema);