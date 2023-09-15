import User from "../models/userModel.js";
import express from "express";

const router = express.Router();

router.post("/user", async (req, res) => {
  const body = req.body;
  try {
    const newUser = new User(body);
    await newUser.save();
    res.status(200).json(newUser);
    console.log(newUser);
  } catch (error) {
    res.status(401).json({ msg: error.message });
    console.log(error.message);
  }
});

router.get("/user", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(201).json(allUsers);
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
});

router.delete("/user", async (req, res) => {
  try {
    const email = "enjamurisagar@gmail.com";
    const deletedUser = await User.findOneAndDelete({ email });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
});

export default router;
