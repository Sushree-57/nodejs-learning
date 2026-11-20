import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware to verify JWT Token
export const verifyToken = (req, res, next) => {
  // 1. Get token from Authorization header: "Bearer <token>"
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied. No token provided."
    });
  }

  // 2. Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach decoded user data to req object
    req.user = decoded;

    // 5. Proceed to the next middleware or controller
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token."
    });
  }
};
