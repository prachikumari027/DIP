"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePatientPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [cognitiveStage, setCognitiveStage] = useState("mild");
  const [preferences, setPreferences] = useState("");

  // Family members
  const [familyMembers, setFamilyMembers] = useState([
    { name: "", relation: "" },
  ]);

  // Routine
  const [routine, setRoutine] = useState([
    { time: "08:00", activity: "Wake up" },
    { time: "09:00", activity: "Take morning medicine" },
    { time: "13:00", activity: "Lunch" },
    { time: "20:00", activity: "Take evening medicine" },
    { time: "21:00", activity: "Dinner" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ─── Family member helpers ─────────────────────────────────────────────
  const updateFamilyMember = (index, field, value) => {
    const updated = [...familyMembers];
    updated[index][field] = value;
    setFamilyMembers(updated);
  };

  const addFamilyMember = () => {
    setFamilyMembers((prev) => [...prev, { name: "", relation: "" }]);
  };

  const removeFamilyMember = (index) => {
    setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
  };

  // ─── Routine helpers ───────────────────────────────────────────────────
  const updateRoutineItem = (index, field, value) => {
    const updated = [...routine];
    updated[index][field] = value;
    setRoutine(updated);
  };

  const addRoutineItem = () => {
    setRoutine((prev) => [...prev, { time: "", activity: "" }]);
  };

  const removeRoutineItem = (index) => {
    setRoutine((prev) => prev.filter((_, i) => i !== index));
  };

  // ─── Submit ────────────────────────────────────────────────────────────
  const handleCreate = async () => {
    setError("");

    if (!name.trim()) {
      setError("Patient name is required.");
      return;
    }
    if (!age || isNaN(Number(age)) || Number(age) <= 0) {
      setError("Please enter a valid age.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const parsedPreferences = preferences
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);

      const cleanedFamilyMembers = familyMembers.filter(
        (m) => m.name.trim() && m.relation.trim()
      );

      const cleanedRoutine = routine.filter(
        (r) => r.time && r.activity.trim()
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/caregiver/patient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name.trim(),
            age: Number(age),
            cognitiveStage,
            preferences: parsedPreferences,
            familyMembers: cleanedFamilyMembers,
            dailyRoutine: cleanedRoutine,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create patient.");
        setLoading(false);
        return;
      }

      // Save patientId to localStorage
      localStorage.setItem("patientId", data.patient._id);

      // Go to caregiver dashboard
      window.location.href = "/caregiver";
    } catch (err) {
      console.error("Create patient error:", err);
      setError("Cannot connect to server. Make sure backend is running.");
      setLoading(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────
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
          maxWidth: "680px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          paddingTop: "40px",
        }}
      >
        {/* HEADER */}
        <div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: "800", color: "#0F233F", margin: 0 }}>
            👤 Create Patient Profile
          </h1>
          <p style={{ fontSize: "1.4rem", color: "#555", marginTop: "8px" }}>
            Set up your patient's profile to get started.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              padding: "14px",
              borderRadius: "12px",
              background: "#FFF5F5",
              border: "1px solid #FECACA",
              color: "#DC2626",
              fontSize: "1.3rem",
            }}
          >
            {error}
          </div>
        )}

        {/* ── BASIC INFO ── */}
        <div style={card}>
          <h2 style={title}>📋 Basic Info</h2>

          <input
            placeholder="Patient full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={inputStyle}
          />

          <div>
            <label style={labelStyle}>Cognitive Stage</label>
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

          <div>
            <label style={labelStyle}>
              Preferences (comma separated, e.g. tea, morning walks)
            </label>
            <input
              placeholder="e.g. tea, music, walks"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              style={{ ...inputStyle, marginTop: "6px" }}
            />
          </div>
        </div>

        {/* ── FAMILY MEMBERS ── */}
        <div style={card}>
          <h2 style={title}>👨‍👩‍👧 Family Members</h2>

          {familyMembers.map((member, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <input
                placeholder="Name (e.g. Priya)"
                value={member.name}
                onChange={(e) => updateFamilyMember(index, "name", e.target.value)}
                style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
              />
              <input
                placeholder="Relation (e.g. daughter)"
                value={member.relation}
                onChange={(e) =>
                  updateFamilyMember(index, "relation", e.target.value)
                }
                style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
              />
              {familyMembers.length > 1 && (
                <button
                  onClick={() => removeFamilyMember(index)}
                  style={removeBtn}
                >
                  🗑
                </button>
              )}
            </div>
          ))}

          <button onClick={addFamilyMember} style={addBtn}>
            + Add Member
          </button>
        </div>

        {/* ── DAILY ROUTINE ── */}
        <div style={card}>
          <h2 style={title}>📅 Daily Routine</h2>

          {routine.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <input
                type="time"
                value={item.time}
                onChange={(e) => updateRoutineItem(index, "time", e.target.value)}
                style={{ ...inputStyle, width: "130px", flexShrink: 0, marginBottom: 0 }}
              />
              <input
                placeholder="Activity (e.g. Take medicine)"
                value={item.activity}
                onChange={(e) =>
                  updateRoutineItem(index, "activity", e.target.value)
                }
                style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
              />
              {routine.length > 1 && (
                <button
                  onClick={() => removeRoutineItem(index)}
                  style={removeBtn}
                >
                  🗑
                </button>
              )}
            </div>
          ))}

          <button onClick={addRoutineItem} style={addBtn}>
            + Add Task
          </button>
        </div>

        {/* CREATE BUTTON */}
        <button
          onClick={handleCreate}
          disabled={loading}
          style={{
            padding: "18px",
            borderRadius: "16px",
            border: "none",
            background: loading
              ? "#A0AEC0"
              : "linear-gradient(135deg, #3373C4, #5A8DEE)",
            color: "white",
            fontSize: "1.6rem",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 10px 25px rgba(51,115,196,0.3)",
          }}
        >
          {loading ? "Creating..." : "Create Patient & Continue →"}
        </button>
      </div>
    </main>
  );
}

// ─── Shared styles ─────────────────────────────────────────────────────────

const card = {
  background: "#FFFFFF",
  borderRadius: "22px",
  padding: "24px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const title = {
  fontSize: "1.8rem",
  fontWeight: "700",
  color: "#1A1A1A",
  margin: 0,
};

const labelStyle = {
  fontSize: "1.2rem",
  color: "#1A1A1A",
  opacity: 0.7,
};

const inputStyle = {
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #D6E6FF",
  fontSize: "1.3rem",
  color: "#1A1A1A",
  outline: "none",
  background: "#FAFCFF",
  width: "100%",
  boxSizing: "border-box",
  marginBottom: "0px",
};

const addBtn = {
  padding: "10px 16px",
  borderRadius: "12px",
  border: "none",
  background: "#EEF5FF",
  color: "#3373C4",
  fontSize: "1.3rem",
  fontWeight: "600",
  cursor: "pointer",
  width: "fit-content",
};

const removeBtn = {
  padding: "10px 12px",
  borderRadius: "10px",
  border: "none",
  background: "#FEE2E2",
  color: "#DC2626",
  fontSize: "1.2rem",
  cursor: "pointer",
  flexShrink: 0,
};