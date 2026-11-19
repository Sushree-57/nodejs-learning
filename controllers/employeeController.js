import db from "../config/db.js";

// 1. Insert Employee (POST)
export const addEmployee = async (req, res) => {
  try {
    const { name, role, salary } = req.body;
    const sql = "INSERT INTO employees (name, role, salary) VALUES (?, ?, ?)";
    await db.query(sql, [name, role, salary]);

    res.status(201).json({ message: "Employee added successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Fetch All Employees (GET)
export const getEmployees = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
