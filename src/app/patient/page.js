
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

const palette = {
  bg: "#D6E6FF",
  card: "#FFFFFF",
  text: "#0F233F",
  accent: "#3373C4",
  green: "#1F8A5C",
  red: "#DC2626",
  softBlue: "#F4FAFF",
};

export default function PatientPage() {
  const [now, setNow] = useState(null);
  const [listening, setListening] = useState(false);
  const [aiText, setAiText] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [sessionMessages, setSessionMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [patient, setPatient] = useState(null);
  const [routine, setRoutine] = useState([]);
  const [loadingPatient, setLoadingPatient] = useState(true);
  const [caregiverMessage, setCaregiverMessage] = useState(null);

  const router = useRouter();
  const socketRef = useRef(null);

  // ─── Clock (client-only to avoid hydration mismatch) ─────────────────────
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // ─── Fetch Patient Profile + Routine ─────────────────────────────────────
  useEffect(() => {
    const patientId = localStorage.getItem("patientId");
    if (!patientId) {
      router.push("/login");
      return;
    }

    const API = process.env.NEXT_PUBLIC_API_URL;

    async function loadData() {
      try {
        const [profileRes, routineRes] = await Promise.all([
          fetch(`${API}/api/patient/profile/${patientId}`),
          fetch(`${API}/api/patient/${patientId}/routine`),
        ]);

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setPatient(profileData.patient);
        }

        if (routineRes.ok) {
          const routineData = await routineRes.json();
          setRoutine(routineData.dailyRoutine || []);
        }
      } catch (err) {
        console.error("Failed to load patient data:", err);
      } finally {
        setLoadingPatient(false);
      }
    }

    loadData();
  }, []);

  // ─── Socket.io Setup ──────────────────────────────────────────────────────
  useEffect(() => {
    const patientId = localStorage.getItem("patientId");
    if (!patientId) return;

    const socket = io(process.env.NEXT_PUBLIC_API_URL);
    socketRef.current = socket;

    socket.emit("join_patient_room", patientId);

    socket.on("reminder", (data) => {
      speak(data.message);
      alert(`⏰ Reminder: ${data.message}`);
    });

    socket.on("caregiver_message", (data) => {
      setCaregiverMessage(data);
      speak(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ─── Hide AI panel after 3 mins ──────────────────────────────────────────
  useEffect(() => {
    if (!showAI) return;
    const timer = setTimeout(() => setShowAI(false), 180000);
    return () => clearTimeout(timer);
  }, [showAI]);

  // ─── End session on page unload ───────────────────────────────────────────
  useEffect(() => {
    const handleUnload = () => {
      const patientId = localStorage.getItem("patientId");
      if (!patientId || sessionMessages.length === 0) return;
      // navigator.sendBeacon(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/ai/end-session`,
      //   JSON.stringify({ patientId, sessionMessages })
      // );
      const blob = new Blob(
        [JSON.stringify({ patientId, sessionMessages })],
        { type: "application/json" }
      );
      navigator.sendBeacon(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/end-session`,
        blob
      );
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [sessionMessages]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const speak = (text) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  const startVoice = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      const patientId = localStorage.getItem("patientId");

      const newUserMsg = { role: "patient", content: text };
      const updatedMessages = [...sessionMessages, newUserMsg];

      setHistory((prev) => [...prev.slice(-4), { by: "You", text }]);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/ai/chat`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              patientId,
              message: text,
              sessionMessages: updatedMessages,
            }),
          }
        );

        const data = await response.json();
        const aiReply = data.reply || "I am having trouble connecting.";

        setSessionMessages(data.updatedMessages || updatedMessages);
        setHistory((prev) => [
          ...prev.slice(-4),
          { by: "AI", text: aiReply },
        ]);
        setAiText(aiReply);
        speak(aiReply);
        setShowAI(true);
      } catch (error) {
        console.error("AI Chat Error:", error);
      }
    };

    recognition.start();
  };

  const markRoutineDone = async (routineItem) => {
    const patientId = localStorage.getItem("patientId");
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/patient/${patientId}/routine/${routineItem._id}`,
        { method: "PATCH" }
      );
      setRoutine((prev) =>
        prev.map((r) =>
          r._id === routineItem._id ? { ...r, completed: true } : r
        )
      );
    } catch (err) {
      console.error("Failed to mark routine done:", err);
    }
  };

  const handleHelp = async () => {
    speak("I have called for help.");
    const patientId = localStorage.getItem("patientId");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId,
          message: "I need help",
          sessionMessages,
        }),
      });
    } catch (err) {
      console.error("Help alert error:", err);
    }
  };

  // ─── Derived values (safe: now can be null on server) ────────────────────
  const dateText = now
    ? now.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : "";

  const timeText = now
    ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  const hour = now ? now.getHours() : 12;
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const patientName = patient?.name || "";

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <main
      style={{
        minHeight: "100vh",
        background: palette.bg,
        padding: "24px",
        color: palette.text,
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "17px",
        }}
      >
        {/* ── GREETING ── */}
        <header style={{ textAlign: "center", padding: "20px", color: "#1A1A1A" }}>
          <h1 style={{ fontSize: "5rem", fontWeight: 900, margin: 0, lineHeight: 1 }}>
            {greeting}{patientName ? `, ${patientName}` : ""}
          </h1>
          <p style={{ fontSize: "2.5rem", marginTop: "20px", opacity: 0.9 }}>
            Today is {dateText}
          </p>
          <p style={{ fontSize: "4rem", fontWeight: 700, marginTop: "10px" }}>
            {timeText}
          </p>
        </header>

        {/* ── CAREGIVER MESSAGE BANNER ── */}
        {caregiverMessage && (
          <div
            style={{
              background: "#EAF4FF",
              borderRadius: "20px",
              padding: "20px 30px",
              border: "2px solid #B6D7FF",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            <strong>Message from Caregiver:</strong> {caregiverMessage.message}
            <button
              onClick={() => setCaregiverMessage(null)}
              style={{
                marginLeft: "20px",
                padding: "6px 16px",
                borderRadius: "10px",
                border: "none",
                background: palette.accent,
                color: "white",
                fontSize: "1.4rem",
                cursor: "pointer",
              }}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── VOICE CHAT ── */}
        <section
          style={{
            background: palette.card,
            borderRadius: "40px",
            padding: "40px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <button
            onClick={startVoice}
            style={{
              width: "100%",
              minHeight: "180px",
              background: listening ? "#2563EB" : palette.green,
              color: "white",
              border: "none",
              borderRadius: "30px",
              fontSize: "4rem",
              fontWeight: 900,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {listening ? (
              "I am Listening..."
            ) : (
              <>
                <img
                  src="/mic.png"
                  alt="mic"
                  style={{ width: "60px", height: "60px", objectFit: "contain" }}
                />
                <span>Talk to Me</span>
              </>
            )}
          </button>

          {showAI && (
            <div
              style={{
                marginTop: "30px",
                background: palette.softBlue,
                borderRadius: "24px",
                padding: "30px",
                border: "2px solid #D0E3FF",
              }}
            >
              <p style={{ margin: 0, fontSize: "3rem", fontWeight: 800, color: palette.accent }}>
                AI Response
              </p>
              <p style={{ margin: "15px 0 0", fontSize: "3.5rem", lineHeight: 1.4, fontWeight: "600" }}>
                {aiText}
              </p>
            </div>
          )}

          <button
            onClick={handleHelp}
            style={{
              width: "100%",
              marginTop: "20px",
              minHeight: "100px",
              borderRadius: "20px",
              border: "none",
              background: "#D32F2F",
              color: "white",
              fontSize: "2.5rem",
              fontWeight: 900,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <img
              src="/emergency.png"
              alt="emergency"
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
            />
            <span>I Need Help</span>
          </button>
        </section>

        {/* ── FAMILY PHOTOS + ROUTINE ── */}
        <div style={{ marginTop: "20px", display: "grid", gap: "20px" }}>
          {/* Family Photos */}
          <div
            onClick={() => router.push("/patient/photos")}
            style={{
              minHeight: "500px",
              borderRadius: "20px",
              border: "2px solid #D0E3FF",
              background: "#FFFFFF",
              padding: "20px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "3.5rem", fontWeight: "700", marginBottom: "20px", textAlign: "center", color: "#0F233F" }}>
              Family Photos
            </h2>
            <img
              src="/family.jpg"
              alt="Family"
              style={{ maxWidth: "100%", maxHeight: "350px", objectFit: "contain", borderRadius: "16px" }}
            />
          </div>

          {/* Today's Routine */}
          <div
            style={{
              minHeight: "500px",
              borderRadius: "20px",
              border: "2px solid #D0E3FF",
              background: "#F4F8FF",
              padding: "20px",
            }}
          >
            <h2 style={{ fontSize: "3.5rem", fontWeight: "700", marginBottom: "20px", textAlign: "center", color: "#0F233F" }}>
              Today's Routine
            </h2>

            {loadingPatient ? (
              <p style={{ fontSize: "2rem", textAlign: "center", opacity: 0.6 }}>Loading routine...</p>
            ) : routine.length === 0 ? (
              <p style={{ fontSize: "2rem", textAlign: "center", opacity: 0.6 }}>No routine set.</p>
            ) : (
              <div style={{ display: "grid", gap: "12px" }}>
                {routine.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => !item.completed && markRoutineDone(item)}
                    style={{
                      padding: "20px",
                      borderRadius: "16px",
                      background: item.completed ? "#E8F9EE" : "#FFFFFF",
                      border: item.completed ? "2px solid #22C55E" : "2px solid #B6D7FF",
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "2rem",
                      cursor: item.completed ? "default" : "pointer",
                    }}
                  >
                    <span>
                      <strong>{item.time}</strong> — {item.activity}
                    </span>
                    {item.completed && (
                      <span style={{ color: "#22C55E" }}>✓ Done</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── CONVERSATION HISTORY ── */}
        <section
          style={{
            background: palette.card,
            borderRadius: "40px",
            padding: "40px",
            opacity: 0.9,
          }}
        >
          <h2 style={{ fontSize: "3.5rem", fontWeight: "700", marginBottom: "20px", color: "#0F233F" }}>
            Recent Conversation
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {history.length === 0 ? (
              <p style={{ fontSize: "1.8rem", opacity: 0.6 }}>No conversation yet. Tap "Talk to Me" to start.</p>
            ) : (
              history.map((m, i) => (
                <div
                  key={i}
                  style={{
                    padding: "20px",
                    borderRadius: "20px",
                    background: m.by === "AI" ? "#EAF4FF" : "#E7FEE9",
                    fontSize: "1.8rem",
                  }}
                >
                  <strong>{m.by}:</strong> {m.text}
                </div>
              ))
            )}
          </div>
        </section>

        <footer style={{ textAlign: "center", padding: "20px" }}>
          <Link href="/" style={{ fontSize: "1.8rem", color: "#1A1A1A", textDecoration: "underline" }}>
            Back to Settings
          </Link>
        </footer>
      </div>
    </main>
  );
}