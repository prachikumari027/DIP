import express from "express";
import Patient from "../models/Patient.js";
import Reminder from "../models/Reminder.js";
import Photo from "../models/Photo.js";
import ConversationLog from "../models/ConversationLog.js";
import DistressEvent from "../models/DistressEvent.js";
import Caregiver from "../models/Caregiver.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// crete patentt

router.post("/patient", verifyToken, async (req, res) => {
  try {
    const { name, age, cognitiveStage, familyMembers, dailyRoutine } = req.body;

    if (!name || !age) {
      return res.status(400).json({ message: "Name and age are required" });
    }

    const patient = await Patient.create({
      name,
      age,
      cognitiveStage: cognitiveStage || "mild",
      familyMembers: familyMembers || [],
      dailyRoutine: dailyRoutine || [],
      caregiverId: req.caregiver.id,
    });

    // link patient to caregiver
    await Caregiver.findByIdAndUpdate(req.caregiver.id, {
      $push: { patientIds: patient._id },
    });

    res.status(201).json({
      message: "Patient created successfully",
      patient,
    });
  } catch (error) {
    console.error("Create patient error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// update patient profile
router.put("/patient/:id", verifyToken, async (req, res) => {
  try {
    const { name, age, cognitiveStage, familyMembers, preferences } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { name, age, cognitiveStage, familyMembers, preferences },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      patient,
    });
  } catch (error) {
    console.error("Update patient error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// add reminder
router.post("/reminder", verifyToken, async (req, res) => {
  try {
    const { patientId, time, message, type } = req.body;

    if (!patientId || !time || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const reminder = await Reminder.create({
      patientId,
      time,
      message,
      type: type || "other",
    });

    res.status(201).json({
      message: "reminder added successfully",
      reminder,
    });
  } catch (error) {
    console.error("Add reminder error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// update remainder 
router.put("/reminder/:id", verifyToken, async (req, res) => {
  try {
    const { time, message, type, isActive } = req.body;

    const reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      { time, message, type, isActive },
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.status(200).json({
      message: "Reminder updated successfully",
      reminder,
    });
  } catch (error) {
    console.error("Update reminder error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// delete remainder
router.delete("/reminder/:id", verifyToken, async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    console.error("Delete reminder error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// add phtot
router.post("/photo", verifyToken, async (req, res) => {
  try {
    const { patientId, imageUrl, caption, personName } = req.body;

    if (!patientId || !imageUrl || !caption || !personName) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    const photo = await Photo.create({
      patientId,
      imageUrl,
      caption,
      personName,
    });

    res.status(201).json({
      message: "Photo added successfully",
      photo,
    });
  } catch (error) {
    console.error("Add photo error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// deleet phhotot
router.delete("/photo/:id", verifyToken, async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);

    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Delete photo error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// gte conversationall logs with ai and patient s 
router.get("/logs/:patientId", verifyToken, async (req, res) => {
  try {
    const logs = await ConversationLog.find({
      patientId: req.params.patientId,
    }).sort({ createdAt: -1 });

    res.status(200).json({ logs });
  } catch (error) {
    console.error("Get logs error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// get distresss mesyre
router.get("/distress/:patientId", verifyToken, async (req, res) => {
  try {
    const events = await DistressEvent.find({
      patientId: req.params.patientId,
    }).sort({ timestamp: -1 });

    res.status(200).json({ events });
  } catch (error) {
    console.error("Get distress error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ack distresss
router.patch("/distress/:id/acknowledge", verifyToken, async (req, res) => {
  try {
    const event = await DistressEvent.findByIdAndUpdate(
      req.params.id,
      { acknowledged: true },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Distress event not found" });
    }

    res.status(200).json({
      message: "Distress event acknowledged",
      event,
    });
  } catch (error) {
    console.error("Acknowledge distress error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// send mssg to patient 
router.post("/message", verifyToken, async (req, res) => {
  try {
    const { patientId, message } = req.body;

    if (!patientId || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // emit real time message to patient via socket
    const io = req.app.get("io");
    io.to(`patient_${patientId}`).emit("caregiver_message", {
      message,
      from: "Caregiver",
      timestamp: new Date(),
    });

    res.status(200).json({ message: "Message sent to patient" });
  } catch (error) {
    console.error("Send message error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// update rotine
router.put("/patient/:id/routine", verifyToken, async (req, res) => {
  try {
    const { dailyRoutine } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { dailyRoutine },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: " Patient not found" });
    }

    res.status(200).json({
      message: "Routine updated successfully",
      dailyRoutine: patient.dailyRoutine,
    });
  } catch (error) {
    console.error("Update routine error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;