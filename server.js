import express from "express";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Main Routes
app.use("/employee", employeeRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
