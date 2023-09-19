import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";

// export const signUp = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, location, picturePath } =
//       req.body;
//     const salt = await bcrypt.genSalt(10);
//     const passwordHashed = await bcrypt.hash(password, salt);
//     const admin = new Admin({
//       firstName,
//       lastName,
//       email,
//       password: passwordHashed,
//       location,
//       picturePath,
//     });
//     const savedAdmin = await admin.save();
//     res.status(201).json(savedAdmin);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

//login

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    console.log(admin);
    if (!admin) return res.status(500).json({ msg: "Admin does not exist" });
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch)
      return res.status(500).json({ msg: "Invalid Admin credentials ..." });

    const adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    res.status(200).json({ adminToken, admin });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get all users

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//delete on user

export const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deleteUser.length)
      return res.status(500).json({ msg: "Something went wrong" });

    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get users with orders

export const getAllUsersWithOrders = async (req, res) => {
  try {
    const allUsers = await User.find({});

    const usersWithOrders = allUsers.filter((user) => user.orders.length !== 0);

    res.status(200).json(usersWithOrders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
{
  /* <Box
              sx={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: palette.primary.main,
              }}
            >
              {params.row.orders?.map((order, index) => (
                <Typography key={index}>{order}</Typography>
              ))}
            </Box> */
}
