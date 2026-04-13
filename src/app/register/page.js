"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    // Validate
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // Store token and caregiver info same as login
      localStorage.setItem("token", data.token);
      localStorage.setItem("caregiverId", data.caregiver.id);

      // New caregiver has no patients yet — redirect to create patient first
      if (data.caregiver.patientIds && data.caregiver.patientIds.length > 0) {
        localStorage.setItem("patientId", data.caregiver.patientIds[0]);
        window.location.href = "/caregiver";
      } else {
        // No patient yet — go to create patient page
        window.location.href = "/caregiver/create-patient";
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Cannot connect to server. Make sure backend is running.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#D6E6FF",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* HEADER */}
        <h1 style={{ marginBottom: "8px", fontSize: "26px", color: "#0F233F" }}>
          🧠 Create Account
        </h1>
        <p style={{ color: "#666", marginBottom: "28px", fontSize: "15px" }}>
          Register as a caregiver to get started.
        </p>

        {/* ERROR */}
        {error && (
          <div
            style={{
              color: "#DC2626",
              background: "#FFF5F5",
              border: "1px solid #FECACA",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* NAME */}
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
          style={{ ...inputStyle, marginBottom: "24px" }}
        />

        {/* REGISTER BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading ? "#A0AEC0" : "linear-gradient(135deg, #3373C4, #5A8DEE)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 8px 20px rgba(51,115,196,0.3)",
          }}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* LOGIN LINK */}
        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "#3373C4", fontWeight: "600", textDecoration: "none" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "14px",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #D6E6FF",
  fontSize: "15px",
  color: "#1A1A1A",
  outline: "none",
  boxSizing: "border-box",
  background: "#FAFCFF",
};