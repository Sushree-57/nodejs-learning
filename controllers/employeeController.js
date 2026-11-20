import db from "../config/db.js";

// 1. Insert New Employee (POST)
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

// 2. Fetch All Employees (GET)
export const getEmployees = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// 3. Update Employee (PUT)
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, salary } = req.body;

    const sql = "UPDATE employees SET name = ?, role = ?, salary = ? WHERE id = ?";
    const [result] = await db.query(sql, [name, role, salary, id]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Employee not found.");
    }

    res.send("Employee updated successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// 4. Delete Employee (DELETE)
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = "DELETE FROM employees WHERE id = ?";
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Employee not found.");
    }

    res.send("Employee deleted successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
