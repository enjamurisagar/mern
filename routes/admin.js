import express from "express";
import { signUp, adminLogin } from "../controllers/admin.js";

const router = express.Router();

// router.post("/signup", signUp);

router.post("/login", adminLogin);

export default router;
