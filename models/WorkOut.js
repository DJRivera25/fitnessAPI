import mongoose from "mongoose";

const workOutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, `full name is required`],
    trim: true,
  },
  duration: {
    type: String,
    required: [true, `email is required`],
    trim: true,
  },
  status: {
    type: String,
    default: "active",
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const WorkOut = mongoose.model("WorkOut", workOutSchema);
export default WorkOut;
