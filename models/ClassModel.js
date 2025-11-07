import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  subject: String,
  latitude: Number,
  longitude: Number
});

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);
export default Class;