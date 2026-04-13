// "use client";
// import Link from "next/link";
// import { useState } from "react";

// export default function SettingsPage() {
//   const [settings, setSettings] = useState({
//     alerts: true,
//     distress: true,
//     aiMonitoring: true,
//     notifications: true,
//   });

//   const toggle = (key) => {
//     setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         background: "#D6E6FF",
//         display: "flex",
//         justifyContent: "center",
//         padding: "40px 20px",
//       }}
//     >
//       {/* CONTAINER */}
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "750px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "24px",
//         }}
//       >
//         {/* HEADER */}
//         <h1
//           style={{
//             fontSize: "2.8rem",
//             fontWeight: "700",
//             color: "#1A1A1A",
//             padding: "90px 30px 10px 30px",
//           }}
//         >
//           ⚙️ Settings
//         </h1>

//         {/* ================= PATIENT ================= */}
//         <div style={card}>
//           <h2 style={title}>👤 Patient</h2>

//           <input placeholder="Patient Name" style={input} />
//           <input placeholder="Age" style={input} />
//         </div>

//         {/* ================= ALERTS ================= */}
//         <div style={card}>
//           <h2 style={title}>🚨 Alerts & Safety</h2>

//           <Toggle
//             label="Missed medicine alerts"
//             value={settings.alerts}
//             onChange={() => toggle("alerts")}
//           />
//           <Toggle
//             label="Distress detection"
//             value={settings.distress}
//             onChange={() => toggle("distress")}
//           />
//         </div>

//         {/* ================= EMERGENCY ================= */}
//         <div style={card}>
//           <h2 style={title}>📞 Emergency Contacts</h2>

//           <input placeholder="Contact 1" style={input} />
//           <input placeholder="Contact 2" style={input} />
//         </div>

//         {/* ================= ROUTINE ================= */}
//         <div style={card}>
//           <h2 style={title}>⏰ Routine Settings</h2>

//           <Toggle
//             label="Enable reminders"
//             value={settings.notifications}
//             onChange={() => toggle("notifications")}
//           />

//           <select style={input}>
//             <option>Reminder 5 min before</option>
//             <option>Reminder 10 min before</option>
//           </select>
//         </div>

//         {/* ================= AI ================= */}
//         <div style={card}>
//           <h2 style={title}>🧠 AI Monitoring</h2>

//           <Toggle
//             label="Enable AI monitoring"
//             value={settings.aiMonitoring}
//             onChange={() => toggle("aiMonitoring")}
//           />
//         </div>

//         {/* ================= BACK ================= */}
//         <Link
//           href="/caregiver"
//           style={{
//             marginTop: "10px",
//             fontSize: "1.3rem",
//             color: "#1A1A1A",
//             opacity: 0.6,
//             textDecoration: "none",
//             borderBottom: "1px solid #1A1A1A",
//             width: "fit-content",
//           }}
//         >
//           ← Back to Dashboard
//         </Link>
//       </div>
//     </main>
//   );
// }

// /* ================= REUSABLE STYLES ================= */

// const card = {
//   background: "#FFFFFF",
//   borderRadius: "22px",
//   padding: "22px",
//   boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
//   display: "flex",
//   flexDirection: "column",
//   gap: "16px",
// };

// const title = {
//   fontSize: "1.8rem",
//   fontWeight: "700",
//   color: "#1A1A1A",
// };

// const input = {
//   padding: "12px",
//   borderRadius: "12px",
//   border: "1px solid #D6E6FF",
//   fontSize: "1.2rem",
//   color: "#1A1A1A",
//   outline: "none",
// };

// /* ================= TOGGLE COMPONENT ================= */

// function Toggle({ label, value, onChange }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <span style={{ color: "#1A1A1A", fontSize: "1.3rem" }}>
//         {label}
//       </span>

//       <div
//         onClick={onChange}
//         style={{
//           width: "50px",
//           height: "26px",
//           borderRadius: "999px",
//           background: value ? "#3373C4" : "#D1D5DB",
//           display: "flex",
//           alignItems: "center",
//           padding: "3px",
//           cursor: "pointer",
//           transition: "0.2s",
//         }}
//       >
//         <div
//           style={{
//             width: "20px",
//             height: "20px",
//             borderRadius: "50%",
//             background: "white",
//             transform: value ? "translateX(24px)" : "translateX(0)",
//             transition: "0.2s",
//           }}
//         />
//       </div>
//     </div>
//   );
// }


"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  // Patient fields
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [cognitiveStage, setCognitiveStage] = useState("mild");
  const [preferences, setPreferences] = useState("");

  // Emergency contacts (stored in familyMembers for now)
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");

  // Toggle settings (local UI only — no backend field for these yet)
  const [settings, setSettings] = useState({
    alerts: true,
    distress: true,
    aiMonitoring: true,
    notifications: true,
    reminderOffset: "5",
  });

  // UI state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  // ─── Load patient data on mount ───────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("patientId");

    if (!token || !patientId) {
      router.push("/login");
      return;
    }

    async function loadPatient() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/patient/profile/${patientId}`
        );
        if (!res.ok) throw new Error("Failed to load patient");
        const data = await res.json();
        const p = data.patient;

        setPatientName(p.name || "");
        setPatientAge(p.age ? String(p.age) : "");
        setCognitiveStage(p.cognitiveStage || "mild");
        setPreferences((p.preferences || []).join(", "));

        // Use first two family member names as emergency contacts
        if (p.familyMembers?.[0]) setContact1(p.familyMembers[0].name || "");
        if (p.familyMembers?.[1]) setContact2(p.familyMembers[1].name || "");
      } catch (err) {
        console.error("Load patient error:", err);
        setError("Could not load patient data.");
      } finally {
        setLoading(false);
      }
    }

    loadPatient();
  }, []);

  // ─── Save patient data ────────────────────────────────────────────────────
  const handleSave = async () => {
    setError("");
    setSaveSuccess(false);

    if (!patientName.trim()) {
      setError("Patient name is required.");
      return;
    }
    if (!patientAge || isNaN(Number(patientAge)) || Number(patientAge) <= 0) {
      setError("Please enter a valid age.");
      return;
    }

    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("patientId");

    if (!token || !patientId) {
      router.push("/login");
      return;
    }

    setSaving(true);

    try {
      // Build family members from contacts
      const familyMembers = [];
      if (contact1.trim()) familyMembers.push({ name: contact1.trim(), relation: "contact" });
      if (contact2.trim()) familyMembers.push({ name: contact2.trim(), relation: "contact" });

      // Parse preferences from comma-separated string
      const parsedPreferences = preferences
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/caregiver/patient/${patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: patientName.trim(),
            age: Number(patientAge),
            cognitiveStage,
            preferences: parsedPreferences,
            familyMembers,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to save settings.");
        setSaving(false);
        return;
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setSaving(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
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

        {/* ERROR */}
        {error && (
          <div
            style={{
              padding: "14px 18px",
              borderRadius: "14px",
              background: "#FFF5F5",
              border: "1px solid #FECACA",
              color: "#DC2626",
              fontSize: "1.3rem",
            }}
          >
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {saveSuccess && (
          <div
            style={{
              padding: "14px 18px",
              borderRadius: "14px",
              background: "#F0FFF4",
              border: "1px solid #BBF7D0",
              color: "#16A34A",
              fontSize: "1.3rem",
              fontWeight: "600",
            }}
          >
            ✅ Settings saved successfully!
          </div>
        )}

        {/* ── PATIENT ── */}
        <div style={card}>
          <h2 style={title}>👤 Patient</h2>

          {loading ? (
            <p style={{ fontSize: "1.3rem", opacity: 0.6 }}>Loading...</p>
          ) : (
            <>
              <input
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="Age"
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                style={inputStyle}
              />

              {/* Cognitive Stage */}
              <div>
                <label style={{ fontSize: "1.2rem", color: "#1A1A1A", opacity: 0.7 }}>
                  Cognitive Stage
                </label>
                <select
                  value={cognitiveStage}
                  onChange={(e) => setCognitiveStage(e.target.value)}
                  style={{ ...inputStyle, marginTop: "6px" }}
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>

              {/* Preferences */}
              <div>
                <label style={{ fontSize: "1.2rem", color: "#1A1A1A", opacity: 0.7 }}>
                  Patient Preferences (comma separated)
                </label>
                <input
                  placeholder="e.g. tea, morning walks, music"
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  style={{ ...inputStyle, marginTop: "6px" }}
                />
              </div>
            </>
          )}
        </div>

        {/* ── ALERTS ── */}
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

        {/* ── EMERGENCY CONTACTS ── */}
        <div style={card}>
          <h2 style={title}>📞 Emergency Contacts</h2>
          {loading ? (
            <p style={{ fontSize: "1.3rem", opacity: 0.6 }}>Loading...</p>
          ) : (
            <>
              <input
                placeholder="Contact 1 name"
                value={contact1}
                onChange={(e) => setContact1(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="Contact 2 name"
                value={contact2}
                onChange={(e) => setContact2(e.target.value)}
                style={inputStyle}
              />
            </>
          )}
        </div>

        {/* ── ROUTINE ── */}
        <div style={card}>
          <h2 style={title}>⏰ Routine Settings</h2>
          <Toggle
            label="Enable reminders"
            value={settings.notifications}
            onChange={() => toggle("notifications")}
          />
          <div>
            <label style={{ fontSize: "1.2rem", color: "#1A1A1A", opacity: 0.7 }}>
              Reminder timing
            </label>
            <select
              value={settings.reminderOffset}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, reminderOffset: e.target.value }))
              }
              style={{ ...inputStyle, marginTop: "6px" }}
            >
              <option value="5">Reminder 5 min before</option>
              <option value="10">Reminder 10 min before</option>
              <option value="15">Reminder 15 min before</option>
            </select>
          </div>
        </div>

        {/* ── AI ── */}
        <div style={card}>
          <h2 style={title}>🧠 AI Monitoring</h2>
          <Toggle
            label="Enable AI monitoring"
            value={settings.aiMonitoring}
            onChange={() => toggle("aiMonitoring")}
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving || loading}
          style={{
            padding: "16px",
            borderRadius: "16px",
            border: "none",
            background:
              saving || loading
                ? "#A0AEC0"
                : "linear-gradient(135deg, #3373C4, #5A8DEE)",
            color: "white",
            fontSize: "1.6rem",
            fontWeight: "700",
            cursor: saving || loading ? "not-allowed" : "pointer",
            boxShadow: "0 10px 25px rgba(51,115,196,0.3)",
          }}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>

        {/* BACK */}
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

// ─── Shared styles ────────────────────────────────────────────────────────────

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

const inputStyle = {
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #D6E6FF",
  fontSize: "1.2rem",
  color: "#1A1A1A",
  outline: "none",
  background: "#FAFCFF",
  width: "100%",
  boxSizing: "border-box",
};

// ─── Toggle component ─────────────────────────────────────────────────────────

function Toggle({ label, value, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ color: "#1A1A1A", fontSize: "1.3rem" }}>{label}</span>
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