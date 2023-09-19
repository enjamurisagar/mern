import express from "express";
import {
  adminLogin,
  getAllUsers,
  deleteUser,
  getAllUsersWithOrders,
} from "../controllers/admin.js";
import { verifyAdminToken } from "../middleware/admin.js";

const router = express.Router();

// router.post("/signup", signUp);

router.post("/login", adminLogin);

router.get("/getAllUsers", verifyAdminToken, getAllUsers);

router.post("/deleteUser/:email", verifyAdminToken, deleteUser);

router.get("/getAllUsersWithOrders", verifyAdminToken, getAllUsersWithOrders);

export default router;
