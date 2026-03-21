"use client";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    alerts: true,
    distress: true,
    aiMonitoring: true,
    notifications: true,
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#D6E6FF",
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      {/* CONTAINER */}
      <div
        style={{
          width: "100%",
          maxWidth: "750px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* HEADER */}
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "700",
            color: "#1A1A1A",
            padding: "90px 30px 10px 30px",
          }}
        >
          ⚙️ Settings
        </h1>

        {/* ================= PATIENT ================= */}
        <div style={card}>
          <h2 style={title}>👤 Patient</h2>

          <input placeholder="Patient Name" style={input} />
          <input placeholder="Age" style={input} />
        </div>

        {/* ================= ALERTS ================= */}
        <div style={card}>
          <h2 style={title}>🚨 Alerts & Safety</h2>

          <Toggle
            label="Missed medicine alerts"
            value={settings.alerts}
            onChange={() => toggle("alerts")}
          />
          <Toggle
            label="Distress detection"
            value={settings.distress}
            onChange={() => toggle("distress")}
          />
        </div>

        {/* ================= EMERGENCY ================= */}
        <div style={card}>
          <h2 style={title}>📞 Emergency Contacts</h2>

          <input placeholder="Contact 1" style={input} />
          <input placeholder="Contact 2" style={input} />
        </div>

        {/* ================= ROUTINE ================= */}
        <div style={card}>
          <h2 style={title}>⏰ Routine Settings</h2>

          <Toggle
            label="Enable reminders"
            value={settings.notifications}
            onChange={() => toggle("notifications")}
          />

          <select style={input}>
            <option>Reminder 5 min before</option>
            <option>Reminder 10 min before</option>
          </select>
        </div>

        {/* ================= AI ================= */}
        <div style={card}>
          <h2 style={title}>🧠 AI Monitoring</h2>

          <Toggle
            label="Enable AI monitoring"
            value={settings.aiMonitoring}
            onChange={() => toggle("aiMonitoring")}
          />
        </div>

        {/* ================= BACK ================= */}
        <Link
          href="/caregiver"
          style={{
            marginTop: "10px",
            fontSize: "1.3rem",
            color: "#1A1A1A",
            opacity: 0.6,
            textDecoration: "none",
            borderBottom: "1px solid #1A1A1A",
            width: "fit-content",
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}

/* ================= REUSABLE STYLES ================= */

const card = {
  background: "#FFFFFF",
  borderRadius: "22px",
  padding: "22px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const title = {
  fontSize: "1.8rem",
  fontWeight: "700",
  color: "#1A1A1A",
};

const input = {
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #D6E6FF",
  fontSize: "1.2rem",
  color: "#1A1A1A",
  outline: "none",
};

/* ================= TOGGLE COMPONENT ================= */

function Toggle({ label, value, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ color: "#1A1A1A", fontSize: "1.3rem" }}>
        {label}
      </span>

      <div
        onClick={onChange}
        style={{
          width: "50px",
          height: "26px",
          borderRadius: "999px",
          background: value ? "#3373C4" : "#D1D5DB",
          display: "flex",
          alignItems: "center",
          padding: "3px",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "white",
            transform: value ? "translateX(24px)" : "translateX(0)",
            transition: "0.2s",
          }}
        />
      </div>
    </div>
  );
}