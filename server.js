import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import employeeRoutes from "./routes/employeeRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// Serve static frontend files directly from the 'ui' directory
app.use(express.static(path.join(__dirname, "../ui")));

// API Routes
app.use("/employee", employeeRoutes);
app.use("/user", userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 UI available at: http://localhost:${PORT}`);
});
