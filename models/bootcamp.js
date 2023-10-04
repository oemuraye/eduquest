import mongoose from "mongoose";

const bootcampUserSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  professional_background: {
    type: String,
    required: true,
  },
  why_join_camp: {
    type: String,
    required: true,
  },
});

export default mongoose.model("BootcampUser", bootcampUserSchema);
