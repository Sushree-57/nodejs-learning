import db from "../config/db.js";

// 1️⃣ Naya Employee Insert Karna (POST)
export const addEmployee = async (req, res) => {
  try {
    const { name, role, salary } = req.body;
    const sql = "INSERT INTO employees (name, role, salary) VALUES (?, ?, ?)";
    await db.query(sql, [name, role, salary]);

    res.send("Data successfully saved in Database!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// 2️⃣ Sabhi Employees Fetch Karna (GET)
export const getEmployees = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

