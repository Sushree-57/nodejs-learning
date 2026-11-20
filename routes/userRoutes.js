import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected Route (Requires Valid JWT Token)
router.get("/profile", verifyToken, getUserProfile);

export default router;
