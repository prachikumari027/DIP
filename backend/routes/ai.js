import express from "express";
import { chat, endSession } from "../services/aiService.js";

const router = express.Router();

// ─── CHAT WITH AI ────────────────────────────────────────
// POST /api/ai/chat
router.post("/chat", async (req, res) => {
  try {
    const { patientId, message, sessionMessages } = req.body;

    if (!patientId || !message) {
      return res.status(400).json({ message: "❌ patientId and message are required" });
    }

    const io = req.app.get("io");

    const result = await chat({
      patientId,
      message,
      sessionMessages: sessionMessages || [],
      io,
    });

    res.status(200).json({
      reply: result.reply,
      updatedMessages: result.updatedMessages,
      distressResult: result.distressResult,
    });
  } catch (error) {
    console.error("Chat route error:", error.message);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// ─── END SESSION ─────────────────────────────────────────
// POST /api/ai/end-session
router.post("/end-session", async (req, res) => {
  try {
    const { patientId, sessionMessages } = req.body;

    if (!patientId || !sessionMessages) {
      return res.status(400).json({ message: "❌ patientId and sessionMessages are required" });
    }

    const result = await endSession({ patientId, sessionMessages });

    res.status(200).json(result);
  } catch (error) {
    console.error("End session route error:", error.message);
    res.status(500).json({ message: "❌ Server error" });
  }
});

export default router;