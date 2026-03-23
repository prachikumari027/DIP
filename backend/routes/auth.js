import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Caregiver from "../models/Caregiver.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Caregiver.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const caregiver = await Caregiver.create({
      name,
      email,
      passwordHash,
    });

    const token = jwt.sign(
      { id: caregiver._id, email: caregiver.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Caregiver registered successfully",
      token,
      caregiver: {
        id: caregiver._id,
        name: caregiver.name,
        email: caregiver.email,
      },
    });

  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const caregiver = await Caregiver.findOne({ email });
    if (!caregiver) {
      return res.status(400).json({ message: "Invalid email or password" });
    }


    const isMatch = await bcrypt.compare(password, caregiver.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }


    const token = jwt.sign(
      { id: caregiver._id, email: caregiver.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      caregiver: {
        id: caregiver._id,
        name: caregiver.name,
        email: caregiver.email,
        patientIds: caregiver.patientIds,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/curr-caregiver", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const caregiver = await Caregiver.findById(decoded.id).select(
      "-passwordHash"
    );
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    res.status(200).json({ caregiver });
  } catch (error) {
    console.error("Me error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;