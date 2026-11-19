import db from "../config/db.js";
import bcrypt from "bcryptjs";

// 1. User Registration Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required."
      });
    }

    // Duplicate Email Check
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Email is already registered. Please use a different email."
      });
    }

    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to Database
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [name, email, hashedPassword]);

    res.status(201).json({
      message: "User registered successfully.",
      userId: result.insertId,
      user: { name, email }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. User Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    // Check if user exists
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found. Please register first."
      });
    }

    const user = users[0];

    // Password Match Check
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid password. Please try again."
      });
    }

    // Success Response
    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. User Logout Controller
export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "Logged out successfully."
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
