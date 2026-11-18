import db from "../config/db.js";
import bcrypt from "bcryptjs";

// 📝 User Registration Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validation: Check karein fields khali toh nahi hain
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email aur password is required!"
      });
    }

    // 2️⃣ Duplicate Check: Kya yeh email pehle se DB me hai?
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Email already exists!"
      });
    }

    // 3️⃣ Password Hashing (Suraksha): Password ko encrypt karna
    // Taaki database me seedha password na dikhe (jaise: $2a$10$e8w...)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ MySQL Database me Naya User Save Karna
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [name, email, hashedPassword]);

    // 5️⃣ Success Response (201 = Created)
    res.status(201).json({
      message: "User registered successfully!🎉",
      userId: result.insertId,
      user: { name, email }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

