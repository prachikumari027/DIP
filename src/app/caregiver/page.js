"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const palette = {
  bg: "#D6E6FF",
  card: "#FFFFFF",
  text: "#0F233F",
  accent: "#3373C4",
  green: "#1F8A5C",
  red: "#DC2626",
};

export default function CaregiverPage() {
  const router = useRouter();
  return (
    <main style={{ minHeight: "100vh", background: palette.bg }}>
      {/* ================= NAVBAR ================= */}

      <div
        style={{
          width: "100%",
          padding: "10px 30px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {/* ================= HEADER ================= */}
        {/* <div
          style={{
            background: palette.card,
            borderRadius: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: "20px",
          }}
        > */}
        <h1
          style={{
            fontSize: "1.7rem",
            fontWeight: "510",
            margin: 0,
            color: palette.accent,
            textAlign: "left",
            padding: "80px 20px 10px 20px",
          }}
        >
          Caregiver Dashboard
        </h1>

        {/* ================= PATIENT INFO + ACTIVITY ================= */}
        <div style={{ display: "flex", gap: "20px", alignItems: "stretch" }}>
          {/* ================= LEFT: PATIENT INFO ================= */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                background: "linear-gradient(135deg, #FFFFFF, #F4F8FF)",
                borderRadius: "28px",
                padding: "28px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                border: "1px solid #E3EEFF",
                display: "flex",
                flexDirection: "column",
                gap: "22px",
                height: "100%",
              }}
            >
              {/* HEADER WITH ICON */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "14px",
                    background: "#E6F0FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                  }}
                >
                  👤
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "2.2rem",
                    color: palette.accent,
                    fontWeight: "700",
                  }}
                >
                  Patient Info
                </h2>
              </div>

              {/* NAME BLOCK */}
              <div
                style={{
                  background: "#EEF5FF",
                  padding: "16px 18px",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "1.6rem",
                }}
              >
                <span style={{ opacity: 0.7, color: "#1A1A1A" }}>
                  Patient Name
                </span>
                <strong style={{ fontSize: "1.8rem", color: "#1A1A1A" }}>
                  Ramesh
                </strong>
              </div>

              {/* DETAILS */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  fontSize: "1.7rem",
                  color: "#1A1A1A",
                }}
              >
                {/* STATUS */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ opacity: 0.6 }}>Status</span>

                  <span
                    style={{
                      background: "#DCFCE7",
                      color: "#16A34A",
                      padding: "8px 18px",
                      borderRadius: "999px",
                      fontWeight: "700",
                      fontSize: "1.4rem",
                      boxShadow: "0 4px 12px rgba(34,197,94,0.25)",
                    }}
                  >
                    🟢 Safe
                  </span>
                </div>

                {/* LAST INTERACTION */}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ opacity: 0.6 }}>Last Interaction</span>
                  <strong>2 mins ago</strong>
                </div>

                {/* ✅ PATIENT HISTORY (CLICKABLE) */}
                <div
                  onClick={() => router.push("/caregiver/history")}
                  style={{
                    background: "#F8FAFF",
                    borderRadius: "16px",
                    padding: "16px",
                    border: "1px solid #E0ECFF",
                    marginTop: "5px",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      marginBottom: "6px",
                      color: "#1A1A1A",
                    }}
                  >
                    📄 Patient History
                  </div>

                  <div
                    style={{
                      fontSize: "1.3rem",
                      opacity: 0.7,
                      color: "#1A1A1A",
                    }}
                  >
                    View complete medical & activity details →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: ACTIVITY ================= */}
          <div
            style={{
              flex: 1,
              borderRadius: "28px",
              padding: "28px",
              background: "linear-gradient(135deg, #FFFFFF, #F4F8FF)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
              border: "1px solid #E3EEFF",
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              maxHeight: "500px", // ✅ LIMIT HEIGHT
              overflowY: "auto", // ✅ ENABLE SCROLL
            }}
          >
            {/* HEADER */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  background: "#E6F0FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.6rem",
                }}
              >
                📍
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: "2.2rem",
                  color: palette.accent,
                  fontWeight: "700",
                }}
              >
                Activity
              </h2>
            </div>

            {/* LOCATION CARD */}
            <div
              style={{
                background: "#EEF5FF",
                padding: "16px 18px",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "1.6rem",
                color: "#1A1A1A",
              }}
            >
              <span style={{ opacity: 0.7, color: "#1A1A1A" }}>
                Current Location
              </span>
              <strong>🏠 Home</strong>
            </div>

            {/* TIMELINE */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                marginTop: "10px",
                maxHeight: "250px", // 👈 controls height
                overflowY: "auto", // 👈 enables scroll
                paddingRight: "8px", // 👈 avoids text cut by scrollbar
              }}
            >
              {/* ITEM */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#3373C4",
                    marginTop: "8px",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "600",
                      color: "#1A1A1A",
                    }}
                  >
                    🗣️ Talked to AI
                  </div>
                  <div
                    style={{
                      fontSize: "1.3rem",
                      opacity: 0.6,
                      color: "#1A1A1A",
                    }}
                  >
                    2 mins ago
                  </div>
                </div>
              </div>

              {/* ITEM */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#DC2626",
                    marginTop: "8px",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "600",
                      color: "#1A1A1A",
                    }}
                  >
                    💊 Missed medicine
                  </div>
                  <div
                    style={{
                      fontSize: "1.3rem",
                      opacity: 0.6,
                      color: "#1A1A1A",
                    }}
                  >
                    9:05 AM
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#3373C4",
                    marginTop: "8px",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "600",
                      color: "#1A1A1A",
                    }}
                  >
                    🗣️ Talked to AI
                  </div>
                  <div
                    style={{
                      fontSize: "1.3rem",
                      opacity: 0.6,
                      color: "#1A1A1A",
                    }}
                  >
                    10 mins ago
                  </div>
                </div>
              </div>

              {/* ITEM */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#1F8A5C",
                    marginTop: "8px",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "600",
                      color: "#1A1A1A",
                    }}
                  >
                    🚶 Walked
                  </div>
                  <div
                    style={{
                      fontSize: "1.3rem",
                      opacity: 0.6,
                      color: "#1A1A1A",
                    }}
                  >
                    Yesterday
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ================= ALERTS ================= */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 15px 40px rgba(220,38,38,0.08)",
            border: "1px solid #FFE2E2",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            minHeight: "400px",
          }}
        >
          {/* HEADER (FIXED) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "2.2rem",
                color: "#DC2626",
                fontWeight: "700",
              }}
            >
              🚨 Alerts
            </h2>

            <span
              style={{
                background: "#FEE2E2",
                color: "#DC2626",
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "1.2rem",
                fontWeight: "600",
              }}
            >
              3 Issues
            </span>
          </div>

          {/* 👇 ONLY THIS PART SCROLLS */}
          <div
            style={{
              maxHeight: "220px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              paddingRight: "6px",
            }}
          >
            {/* ALERT CARD 1 */}
            <div
              style={{
                background: "#FFF5F5",
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid #FECACA",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "#FEE2E2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                }}
              >
                ⚠️
              </div>

              <div>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "600",
                    color: "#1A1A1A",
                  }}
                >
                  Distress detected
                </div>
                <div
                  style={{ fontSize: "1.3rem", opacity: 0.6, color: "#1A1A1A" }}
                >
                  Short response at 10:14 AM
                </div>
              </div>
            </div>

            {/* ALERT CARD 2 */}
            <div
              style={{
                background: "#EFF6FF",
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid #BFDBFE",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "#DBEAFE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                }}
              >
                📍
              </div>

              <div>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "600",
                    color: "#1A1A1A",
                  }}
                >
                  Location changed
                </div>
                <div
                  style={{ fontSize: "1.3rem", opacity: 0.6, color: "#1A1A1A" }}
                >
                  Patient moved outside home area
                </div>
              </div>
            </div>

            {/* ALERT CARD 3 */}
            <div
              style={{
                background: "#FFFBEB",
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid #FDE68A",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "#FEF3C7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                }}
              >
                💊
              </div>

              <div>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "600",
                    color: "#1A1A1A",
                  }}
                >
                  Missed medicine
                </div>
                <div
                  style={{ fontSize: "1.3rem", opacity: 0.6, color: "#1A1A1A" }}
                >
                  9:05 AM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BACK ================= */}
        <div style={{ textAlign: "center", marginTop: "6px" }}>
          <Link
            href="/"
            style={{
              fontSize: "1.6rem",
              color: palette.accent,
              textDecoration: "underline",
            }}
          >
            Back to Mode Selection
          </Link>
        </div>
      </div>
    </main>
  );
}
