import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, `full name is required`],
      trim: true,
    },
    email: {
      type: String,
      required: [true, `email is required`],
      trim: true,
    },
    password: {
      type: String,
      required: [true, `password is required`],
      trim: true,
    },
    mobileNo: {
      type: String,
      required: [true, `mobile number is required`],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, `gender field is required`],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
