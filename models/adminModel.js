import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      required: true,
      type: String,

      max: 20,
    },
    lastName: {
      required: true,
      type: String,

      max: 20,
    },
    email: {
      required: true,
      type: String,

      max: 40,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    picturePath: {
      type: String,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
