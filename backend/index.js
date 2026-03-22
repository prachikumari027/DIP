import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";
import { initSocket } from "./socket/socketManager.js";
import { startReminderCron } from "./services/reminderCron.js";

import authRoutes from "./routes/auth.js";
import patientRoutes from "./routes/patient.js";
import caregiverRoutes from "./routes/caregiver.js";
import uploadRoutes from "./routes/upload.js";
const PORT = process.env.PORT || 5000;


const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


connectDB();


app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make io accessible inside routes
app.set("io", io);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/caregiver", caregiverRoutes);
app.use("/api/upload", uploadRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Alzheimer AI Companion Backend is running" });
});

// Init Socket
initSocket(io);

// Start Cron
startReminderCron(io);


server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});