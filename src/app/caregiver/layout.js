"use client";
import Link from "next/link";

const palette = {
  accent: "#3373C4",
};

export default function CaregiverLayout({ children }) {
  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div
        style={{
          width: "100%",
          background: palette.accent,
          color: "white",
          padding: "16px 0",
          position: "fixed", // ✅ FIXED
          top: 0, // ✅ stick to top
          left: 0,
          zIndex: 1000, // ✅ stay above everything
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* HOME */}
          <Link href="/caregiver">
            <img
              src="/home.png"
              alt="Home"
              style={{
                width: "35px",
                height: "35px",
                cursor: "pointer",
              }}
            />
          </Link>

          {/* NAV LINKS */}
          <div style={{ display: "flex", gap: "30px", fontSize: "1.4rem" }}>
            <Link
              href="/caregiver/upload"
              style={{ color: "white", textDecoration: "none" }}
            >
              Upload
            </Link>

            <Link
              href="/caregiver/routine"
              style={{ color: "white", textDecoration: "none" }}
            >
              Routine
            </Link>

            <Link href="/caregiver/setting">
              <img
                src="/setting.png"
                alt="Settings"
                style={{
                  width: "35px",
                  height: "35px",
                  cursor: "pointer",
                }}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <div>{children}</div>
    </>
  );
}
