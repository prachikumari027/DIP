"use client";
import Link from "next/link";

const palette = {
  bg: "#0707f1",
  card: "#FFFFFF",
  text: "#0B2447",
  accent: "#3373C4",
  soft: "#73B9EE",
  deep: "#003396",
  green: "#1F8A5C",
};

export default function HomePage() {
  return (
    <main 
      style={{ 
        minHeight: "100vh", 
        background: palette.bg, 
        padding: "40px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center" 
      }}
    >
      {/* CHANGES MADE BELOW:
          1. maxWidth increased from 740px to 1100px
          2. padding increased from 28px to 80px for a "spacious" feel
          3. borderRadius increased to 40px for a softer look
      */}
      <div 
        style={{ 
          width: "100%", 
          maxWidth: "1100px", 
          background: palette.card, 
          borderRadius: "40px", 
          boxShadow: "0 20px 50px rgba(0,0,0,0.1)", 
          padding: "80px", 
          textAlign: "center" 
        }}
      >
        <p style={{ margin: 0, fontSize: "2rem", color: palette.accent, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
          Alzheimer's AI Companion
        </p>
        
        <h1 style={{ margin: "24px 0 16px", fontSize: "4.5rem", lineHeight: 1.1, color: palette.deep, fontWeight: 800 }}>
          Choose your mode
        </h1>
        
        {/* <p style={{ margin: "0 0 48px", fontSize: "2rem", color: palette.text, opacity: 0.8 }}>
          Please select an interface to begin.
        </p> */}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginTop: "20px" }}>
          
          {/* PATIENT OPTION */}
          <Link href="/patient" style={{ textDecoration: "none" }}>
            <button 
              style={{ 
                width: "100%", 
                minHeight: "220px", 
                borderRadius: "30px", 
                border: `4px solid ${palette.accent}`, 
                background: "#F0F7FF", 
                color: palette.deep, 
                padding: "30px",
                cursor: "pointer",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ fontSize: "3.5rem", fontWeight: 800, marginBottom: "10px" }}>Patient</div>
              {/* <div style={{ fontSize: "1.5rem", color: palette.text, lineHeight: 1.4, fontWeight: 500 }}>
                Simple view with voice chat, <br/> reminders, and family photos.
              </div> */}
            </button>
          </Link>

          {/* CAREGIVER OPTION */}
          <Link href="/caregiver" style={{ textDecoration: "none" }}>
            <button 
              style={{ 
                width: "100%", 
                minHeight: "220px", 
                borderRadius: "30px", 
                border: `4px solid ${palette.green}`, 
                background: "#F1FAF5", 
                color: palette.deep, 
                padding: "30px",
                cursor: "pointer",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ fontSize: "3.5rem", fontWeight: 800, marginBottom: "10px" }}>Caregiver</div>
              {/* <div style={{ fontSize: "1.5rem", color: palette.text, lineHeight: 1.4, fontWeight: 500 }}>
                Dashboard to manage routine, <br/> check alerts, and update info.
              </div> */}
            </button>
          </Link>

        </div>
      </div>
    </main>
  );
}