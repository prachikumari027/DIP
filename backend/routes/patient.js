import express from "express";
import Patient from "../models/Patient.js";
import Photo from "../models/Photo.js";
import Reminder from "../models/Reminder.js";

const router = express.Router();


router.get("/profile/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ patient });
  } catch (error) {
    console.error("Get patient error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id/photos", async (req, res) => {
  try {
    const photos = await Photo.find({ patientId: req.params.id });

    if (!photos || photos.length === 0) {
      return res.status(404).json({ message: "No photos found" });
    }

    res.status(200).json({ photos });
  } catch (error) {
    console.error("Get photos error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/:id/routine", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select(
      "dailyRoutine name"
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      name: patient.name,
      dailyRoutine: patient.dailyRoutine,
    });
  } catch (error) {
    console.error("Get routine error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id/reminders", async (req, res) => {
  try {
    const reminders = await Reminder.find({
      patientId: req.params.id,
      isActive: true,
    });

    if (!reminders || reminders.length === 0) {
      return res.status(404).json({ message: "No reminders found" });
    }

    res.status(200).json({ reminders });
  } catch (error) {
    console.error("Get reminders error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id/routine/:routineId", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const routineItem = patient.dailyRoutine.id(req.params.routineId);

    if (!routineItem) {
      return res.status(404).json({ message: "Routine item not found" });
    }

    routineItem.completed = true;
    await patient.save();

    res.status(200).json({ message: "Routine item marked complete" });
  } catch (error) {
    console.error("Update routine error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


router.patch("/:id/reminder/:reminderId/acknowledge", async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.reminderId);

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    reminder.lastTriggered = new Date();
    await reminder.save();

    res.status(200).json({ message: "Reminder acknowledged" });
  } catch (error) {
    console.error("Acknowledge reminder error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;