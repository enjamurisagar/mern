import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "../models/adminModel.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, picturePath } =
      req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);
    const admin = new Admin({
      firstName,
      lastName,
      email,
      password: passwordHashed,
      location,
      picturePath,
    });
    const savedAdmin = await admin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//login

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    console.log(admin);
    if (!admin) res.status(400).json({ msg: "Admin does not exist" });
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch)
      res.status(400).json({ msg: "Invalid credentials ..." });

    const adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    res.status(200).json({ adminToken, admin });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
