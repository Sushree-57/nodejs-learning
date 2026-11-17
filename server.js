import express from "express";
import mysql from "mysql2/promise";

const app = express();
app.use(express.json());

// 1. Database Connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "nodejs_db"
});

// 2. Insert API (POST)
app.post("/employee", async (req, res) => {
  const { name, role, salary } = req.body;

  const sql = "INSERT INTO employees (name, role, salary) VALUES (?, ?, ?)";
  await db.query(sql, [name, role, salary]);

  res.send("Data successfully saved in Database!");
});

// 3. Server Start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
