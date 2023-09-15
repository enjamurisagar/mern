import User from "../models/userModel.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//controllers
import { login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
export default router;
