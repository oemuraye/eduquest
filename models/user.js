import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  hasPaid: {
    type: Boolean,
  },
  payment_ref: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  academic_qualification: {
    type: String,
    required: true,
  },
  course_studied: {
    type: String,
    required: true,
  },
  institution_of_study: {
    type: String,
    required: true,
  },
  reasons_for_data_analysis_study: {
    type: String,
    required: true,
  },
  career_progression: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
