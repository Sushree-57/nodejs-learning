import express from "express";
import {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";

const router = express.Router();

// Employee CRUD Routes
router.post("/", addEmployee);        // POST   /employee
router.get("/", getEmployees);         // GET    /employee
router.put("/:id", updateEmployee);    // PUT    /employee/:id
router.delete("/:id", deleteEmployee); // DELETE /employee/:id

export default router;
