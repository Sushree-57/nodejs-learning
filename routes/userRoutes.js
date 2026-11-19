import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";

const router = express.Router();

// 1. Register Route: POST /user/register
router.post("/register", registerUser);

// 2. Login Route: POST /user/login
router.post("/login", loginUser);

// 3. Logout Route: POST /user/logout
router.post("/logout", logoutUser);

export default router;
