"use client";
import Link from "next/link";

export default function HistoryPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#D6E6FF",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        {/* HEADER */}
        <h1
          style={{
            fontSize: "3.8rem",
            fontWeight: "800",
            color: "#1A1A1A",
            padding: "70px 30px 10px 30px",
          }}
        >
          🏥 Patient Medical History
        </h1>

        {/* ================= OVERVIEW ================= */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "2rem", color: "#1A1A1A" }}>
            🧾 Patient Overview
          </h2>

          <div
            style={{
              marginTop: "15px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "15px",
              fontSize: "1.5rem"
            }}
          >
            {[
              ["Name", "Ramesh"],
              ["Age", "72"],
              ["Condition", "Mild Dementia"],
              ["Risk Level", "Low"],
            ].map(([label, value], i) => (
              <div
                key={i}
                style={{
                  background: "#EEF5FF",
                  padding: "15px",
                  borderRadius: "14px",
                  fontSize: "1.5rem"
                }}
              >
                <div style={{ opacity: 0.6, color: "#1A1A1A" }}>
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "700",
                    color: "#1A1A1A",
                    
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= MEDICATION ================= */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", color: "#1A1A1A" }}>
            💊 Medication Tracker
          </h2>

          <div style={{ marginTop: "15px", display: "grid", gap: "12px",fontSize: "1.5rem" }}>
            {[
              { name: "Donepezil", dose: "5mg", status: "Missed" },
              { name: "Vitamin B12", dose: "Daily", status: "Taken" },
            ].map((med, i) => (
              <div
                key={i}
                style={{
                  padding: "15px",
                  borderRadius: "14px",
                  background: "#F8FAFF",
                  border: "1px solid #E0ECFF",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ color: "#1A1A1A" }}>
                  <strong>{med.name}</strong> — {med.dose}
                </div>

                <span
                  style={{
                    color:
                      med.status === "Missed" ? "#DC2626" : "#16A34A",
                    fontWeight: "600",
                  }}
                >
                  {med.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ALERTS ================= */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", color: "#1A1A1A" }}>
            🚨 Alerts Timeline
          </h2>

          <div style={{ marginTop: "15px", display: "grid", gap: "10px",fontSize: "1.5rem" }}>
            {[
              ["Distress detected", "High", "#DC2626"],
              ["Missed medicine", "Medium", "#F59E0B"],
              ["Location change", "Low", "#2563EB"],
            ].map(([text, level, color], i) => (
              <div
                key={i}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  background: "#F9FAFB",
                  display: "flex",
                  justifyContent: "space-between",
                  borderLeft: `6px solid ${color}`,
                }}
              >
                <span style={{ color: "#1A1A1A" }}>{text}</span>

                <span style={{ color, fontWeight: "600" }}>
                  {level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= HEALTH SUMMARY ================= */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", color: "#1A1A1A" }}>
            📊 Health Summary
          </h2>

          <div
            style={{
              marginTop: "15px",
              padding: "15px",
              borderRadius: "14px",
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              color: "#1A1A1A",
              fontSize: "1.5rem"
            }}
          >
            Patient is stable. Shows good activity in mornings but needs
            reminders for medication adherence.
          </div>
        </div>

        {/* BACK */}
        <Link
          href="/caregiver"
          style={{
            textAlign: "center",
            fontSize: "1.4rem",
            color: "#1A1A1A",
            textDecoration: "underline",
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}