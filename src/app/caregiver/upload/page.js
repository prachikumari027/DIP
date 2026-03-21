"use client";
import Link from "next/link";
import { useState } from "react";

const palette = {
  bg: "#D6E6FF",
  card: "#FFFFFF",
  text: "#1A1A1A",
  accent: "#3373C4",
};

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = () => {
    setLoading(true);

    // simulate upload
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // reset after 2 sec (optional)
      setTimeout(() => setSuccess(false), 2000);
    }, 1500);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: palette.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          fontSize: "2.4rem",
          color: "#1A1A1A",
          marginBottom: "20px",
          fontWeight: "700",
          padding: "90px 30px 10px 30px",
        }}
      >
        📸 Upload Family Photo
      </h1>

      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "linear-gradient(135deg, #FFFFFF, #F4F8FF)",
          borderRadius: "28px",
          padding: "28px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
          border: "1px solid #E3EEFF",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* FILE INPUT */}
        <label
          style={{
            border: "2px dashed #AFCBFF",
            borderRadius: "18px",
            padding: "22px",
            textAlign: "center",
            cursor: "pointer",
            background: "#F8FBFF",
            color: "#1A1A1A",
            fontSize: "1.4rem",
          }}
        >
          📁 Click to upload image
          <input type="file" style={{ display: "none" }} />
        </label>

        {/* NAME INPUT */}
        <input
          type="text"
          placeholder="Enter name (e.g. Priya)"
          style={{
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid #D6E6FF",
            fontSize: "1.4rem",
            color: "#1A1A1A",
            background: "#FAFCFF",
            outline: "none",
          }}
        />

        {/* RELATION INPUT */}
        <input
          type="text"
          placeholder="Enter relation (e.g. Daughter)"
          style={{
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid #D6E6FF",
            fontSize: "1.4rem",
            color: "#1A1A1A",
            background: "#FAFCFF",
            outline: "none",
          }}
        />

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "16px",
            borderRadius: "16px",
            fontSize: "1.6rem",
            fontWeight: "600",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            color: "white",
            background: success
              ? "linear-gradient(135deg, #22C55E, #4ADE80)"
              : "linear-gradient(135deg, #3373C4, #5A8DEE)",
            boxShadow: success
              ? "0 10px 25px rgba(34,197,94,0.4)"
              : "0 10px 25px rgba(51,115,196,0.35)",
            transition: "all 0.3s ease",
            transform: loading ? "scale(0.98)" : "scale(1)",
          }}
        >
          {loading
            ? "Uploading..."
            : success
            ? "✔ Uploaded"
            : "Upload"}
        </button>
      </div>

      {/* BACK */}
      <Link
        href="/caregiver"
        style={{
          marginTop: "25px",
          fontSize: "1.3rem",
          color: "#1A1A1A",
          opacity: 0.6,
          textDecoration: "none",
          borderBottom: "1px solid #1A1A1A",
          paddingBottom: "2px",
        }}
      >
        ← Back to Dashboard
      </Link>
    </main>
  );
}