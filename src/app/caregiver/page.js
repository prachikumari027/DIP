"use client";
import Link from "next/link";

const palette = {
  bg: "#0509f5",
  card: "#FFFFFF",
  text: "#0F233F",
  accent: "#3373C4",
  green: "#1F8A5C",
  red: "#DC2626",
};

export default function CaregiverPage() {
  return (
    <main style={{ minHeight: "100vh", background: palette.bg, padding: "18px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ background: palette.card, borderRadius: "20px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", padding: "20px" }}>
          <h1 style={{ fontSize: "2.8rem", margin: 0, color: palette.accent }}>Caregiver Dashboard</h1>
          <p style={{ marginTop: "10px", fontSize: "1.6rem", color: palette.text }}>Manage reminders and see alerts for Ramesh.</p>
        </div>

        <div style={{ background: "#F8FCFF", borderRadius: "18px", border: `2px solid ${palette.accent}`, padding: "16px" }}>
          <h2 style={{ margin: 0, fontSize: "2rem", color: palette.text }}>Upcoming Reminders</h2>
          <ul style={{ marginTop: "12px", fontSize: "1.8rem", lineHeight: 1.6 }}>
            <li>9:00 AM - Medicine reminder</li>
            <li>12:30 PM - Lunch reminder</li>
            <li>3:00 PM - Doctor appointment</li>
            <li>5:30 PM - Drink water</li>
          </ul>
        </div>

        <div style={{ background: "#FFF8F0", borderRadius: "18px", border: `2px solid ${palette.red}`, padding: "16px" }}>
          <h2 style={{ margin: 0, fontSize: "2rem", color: palette.red }}>Recent Alerts</h2>
          <ul style={{ marginTop: "12px", fontSize: "1.8rem", lineHeight: 1.6 }}>
            <li>Distress event: short response at 10:14</li>
            <li>Missed medicine at 9:05</li>
          </ul>
        </div>

        <div style={{ background: palette.card, borderRadius: "18px", border: `2px solid ${palette.green}`, padding: "16px" }}>
          <h2 style={{ margin: 0, fontSize: "2rem", color: palette.green }}>Daily Routine</h2>
          <div style={{ marginTop: "12px", fontSize: "1.7rem", lineHeight: 1.5 }}>
            <div>08:00 - Wake up</div>
            <div>09:00 - Medicine</div>
            <div>12:30 - Lunch</div>
            <div>15:00 - Walk</div>
            <div>18:30 - Dinner</div>
          </div>
          <button style={{ marginTop: "16px", minHeight: "70px", minWidth: "180px", borderRadius: "14px", fontSize: "1.7rem", border: "1px solid #3373C4", background: "#3373C4", color: "white" }}>Edit Routine</button>
        </div>

        <div style={{ textAlign: "center", marginTop: "6px" }}>
          <Link href="/" style={{ fontSize: "1.6rem", color: palette.accent, textDecoration: "underline" }}>Back to Mode Selection</Link>
        </div>
      </div>
    </main>
  );
}
