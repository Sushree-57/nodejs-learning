import express from "express";
import { addEmployee, getEmployees } from "../controllers/employeeController.js";

const router = express.Router();

// Routes
router.post("/", addEmployee); // POST /employee (Insert)
router.get("/", getEmployees);  // GET  /employee (Fetch)

export default router;

