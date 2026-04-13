// "use client";
// import Link from "next/link";

// export default function HistoryPage() {
//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         background: "#D6E6FF",
//         padding: "40px 20px",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "1000px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "25px",
//         }}
//       >
//         {/* HEADER */}
//         <h1
//           style={{
//             fontSize: "3.8rem",
//             fontWeight: "800",
//             color: "#1A1A1A",
//             padding: "70px 30px 10px 30px",
//           }}
//         >
//           🏥 Patient Medical History
//         </h1>

//         {/* ================= OVERVIEW ================= */}
//         <div
//           style={{
//             background: "#FFFFFF",
//             borderRadius: "24px",
//             padding: "24px",
//             boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
//           }}
//         >
//           <h2 style={{ fontSize: "2rem", color: "#1A1A1A" }}>
//             🧾 Patient Overview
//           </h2>

//           <div
//             style={{
//               marginTop: "15px",
//               display: "grid",
//               gridTemplateColumns: "repeat(4, 1fr)",
//               gap: "15px",
//               fontSize: "1.5rem"
//             }}
//           >
//             {[
//               ["Name", "Ramesh"],
//               ["Age", "72"],
//               ["Condition", "Mild Dementia"],
//               ["Risk Level", "Low"],
//             ].map(([label, value], i) => (
//               <div
//                 key={i}
//                 style={{
//                   background: "#EEF5FF",
//                   padding: "15px",
//                   borderRadius: "14px",
//                   fontSize: "1.5rem"
//                 }}
//               >
//                 <div style={{ opacity: 0.6, color: "#1A1A1A" }}>
//                   {label}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "1.6rem",
//                     fontWeight: "700",
//                     color: "#1A1A1A",
                    
//                   }}
//                 >
//                   {value}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ================= MEDICATION ================= */}
//         <div
//           style={{
//             background: "#FFFFFF",
//             borderRadius: "24px",
//             padding: "24px",
//             boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
//           }}
//         >
//           <h2 style={{ fontSize: "1.8rem", color: "#1A1A1A" }}>
//             💊 Medication Tracker
//           </h2>

//           <div style={{ marginTop: "15px", display: "grid", gap: "12px",fontSize: "1.5rem" }}>
//             {[
//               { name: "Donepezil", dose: "5mg", status: "Missed" },
//               { name: "Vitamin B12", dose: "Daily", status: "Taken" },
//             ].map((med, i) => (
//               <div
//                 key={i}
//                 style={{
//                   padding: "15px",
//                   borderRadius: "14px",
//                   background: "#F8FAFF",
//                   border: "1px solid #E0ECFF",
//                   display: "flex",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <div style={{ color: "#1A1A1A" }}>
//                   <strong>{med.name}</strong> — {med.dose}
//                 </div>

//                 <span
//                   style={{
//                     color:
//                       med.status === "Missed" ? "#DC2626" : "#16A34A",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {med.status}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ================= ALERTS ================= */}
//         <div
//           style={{
//             background: "#FFFFFF",
//             borderRadius: "24px",
//             padding: "24px",
//             boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
//           }}
//         >
//           <h2 style={{ fontSize: "1.8rem", color: "#1A1A1A" }}>
//             🚨 Alerts Timeline
//           </h2>

//           <div style={{ marginTop: "15px", display: "grid", gap: "10px",fontSize: "1.5rem" }}>
//             {[
//               ["Distress detected", "High", "#DC2626"],
//               ["Missed medicine", "Medium", "#F59E0B"],
//               ["Location change", "Low", "#2563EB"],
//             ].map(([text, level, color], i) => (
//               <div
//                 key={i}
//                 style={{
//                   padding: "14px",
//                   borderRadius: "12px",
//                   background: "#F9FAFB",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   borderLeft: `6px solid ${color}`,
//                 }}
//               >
//                 <span style={{ color: "#1A1A1A" }}>{text}</span>

//                 <span style={{ color, fontWeight: "600" }}>
//                   {level}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ================= HEALTH SUMMARY ================= */}
//         <div
//           style={{
//             background: "#FFFFFF",
//             borderRadius: "24px",
//             padding: "24px",
//             boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
//           }}
//         >
//           <h2 style={{ fontSize: "1.8rem", color: "#1A1A1A" }}>
//             📊 Health Summary
//           </h2>

//           <div
//             style={{
//               marginTop: "15px",
//               padding: "15px",
//               borderRadius: "14px",
//               background: "#F0FDF4",
//               border: "1px solid #BBF7D0",
//               color: "#1A1A1A",
//               fontSize: "1.5rem"
//             }}
//           >
//             Patient is stable. Shows good activity in mornings but needs
//             reminders for medication adherence.
//           </div>
//         </div>

//         {/* BACK */}
//         <Link
//           href="/caregiver"
//           style={{
//             textAlign: "center",
//             fontSize: "1.4rem",
//             color: "#1A1A1A",
//             textDecoration: "underline",
//           }}
//         >
//           ← Back to Dashboard
//         </Link>
//       </div>
//     </main>
//   );
// }



"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const router = useRouter();

  const [patient, setPatient] = useState(null);
  const [distressEvents, setDistressEvents] = useState([]);
  const [conversationLogs, setConversationLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ─── Fetch all data ───────────────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("patientId");

    if (!token || !patientId) {
      router.push("/login");
      return;
    }

    const API = process.env.NEXT_PUBLIC_API_URL;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    async function loadData() {
      try {
        const [profileRes, distressRes, logsRes] = await Promise.all([
          fetch(`${API}/api/patient/profile/${patientId}`),
          fetch(`${API}/api/caregiver/distress/${patientId}`, { headers }),
          fetch(`${API}/api/caregiver/logs/${patientId}`, { headers }),
        ]);

        if (profileRes.ok) {
          const d = await profileRes.json();
          setPatient(d.patient);
        }
        if (distressRes.ok) {
          const d = await distressRes.json();
          setDistressEvents(d.events || []);
        }
        if (logsRes.ok) {
          const d = await logsRes.json();
          setConversationLogs(d.logs || []);
        }
      } catch (err) {
        console.error("Failed to load history data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const formatTime = (isoString) => {
    if (!isoString) return "—";
    return new Date(isoString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Derive medication status from reminders inside patient routine
  // The backend stores dailyRoutine; medicine items are activities containing "medicine"
  const medicineItems = patient?.dailyRoutine?.filter((r) =>
    r.activity?.toLowerCase().includes("medicine")
  ) || [];

  // Distress severity label
  const getSeverityLabel = (score) => {
    if (score >= 7) return { label: "High", color: "#DC2626" };
    if (score >= 4) return { label: "Medium", color: "#F59E0B" };
    return { label: "Low", color: "#2563EB" };
  };

  // Health summary: derive from distress score average
  const avgDistress =
    distressEvents.length > 0
      ? (
          distressEvents.reduce((sum, e) => sum + (e.distressScore || 0), 0) /
          distressEvents.length
        ).toFixed(1)
      : null;

  const healthSummary = (() => {
    if (loading) return "Loading health summary...";
    if (!patient) return "Patient data unavailable.";
    const name = patient.name;
    if (distressEvents.length === 0 && conversationLogs.length > 0)
      return `${name} is doing well. No distress events recorded. Regular AI conversations are ongoing.`;
    if (distressEvents.length === 0)
      return `${name} has no recorded distress events. Continue monitoring regularly.`;
    return `${name} has ${distressEvents.length} distress event${
      distressEvents.length > 1 ? "s" : ""
    } on record with an average distress score of ${avgDistress}. Consider reviewing medication adherence and daily routine.`;
  })();

  // ─── Render ───────────────────────────────────────────────────────────────
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

        {/* ── PATIENT OVERVIEW ── */}
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

          {loading ? (
            <p style={{ fontSize: "1.5rem", opacity: 0.6, marginTop: "12px" }}>
              Loading...
            </p>
          ) : (
            <div
              style={{
                marginTop: "15px",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "15px",
                fontSize: "1.5rem",
              }}
            >
              {[
                ["Name", patient?.name || "—"],
                ["Age", patient?.age ? `${patient.age} yrs` : "—"],
                [
                  "Condition",
                  patient?.cognitiveStage
                    ? patient.cognitiveStage.charAt(0).toUpperCase() +
                      patient.cognitiveStage.slice(1) +
                      " Dementia"
                    : "—",
                ],
                [
                  "Risk Level",
                  distressEvents.length === 0
                    ? "Low"
                    : distressEvents.length <= 2
                    ? "Medium"
                    : "High",
                ],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  style={{
                    background: "#EEF5FF",
                    padding: "15px",
                    borderRadius: "14px",
                  }}
                >
                  <div style={{ opacity: 0.6, color: "#1A1A1A" }}>{label}</div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      color: "#1A1A1A",
                      marginTop: "4px",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── MEDICATION TRACKER ── */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", color: "#1A1A1A" }}>
            💊 Medication Schedule
          </h2>

          <div
            style={{ marginTop: "15px", display: "grid", gap: "12px", fontSize: "1.5rem" }}
          >
            {loading ? (
              <p style={{ opacity: 0.6 }}>Loading...</p>
            ) : medicineItems.length === 0 ? (
              <p style={{ opacity: 0.6 }}>No medicine items in routine.</p>
            ) : (
              medicineItems.map((item, i) => (
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
                    <strong>{item.time}</strong> — {item.activity}
                  </div>
                  <span
                    style={{
                      color: item.completed ? "#16A34A" : "#DC2626",
                      fontWeight: "600",
                    }}
                  >
                    {item.completed ? "✅ Taken" : "❌ Missed"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── ALERTS TIMELINE ── */}
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

          <div
            style={{ marginTop: "15px", display: "grid", gap: "10px", fontSize: "1.5rem" }}
          >
            {loading ? (
              <p style={{ opacity: 0.6 }}>Loading...</p>
            ) : distressEvents.length === 0 ? (
              <div
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  background: "#F0FFF4",
                  border: "1px solid #BBF7D0",
                  color: "#16A34A",
                  fontSize: "1.5rem",
                }}
              >
                ✅ No distress events recorded.
              </div>
            ) : (
              distressEvents.map((event, i) => {
                const { label, color } = getSeverityLabel(event.distressScore);
                return (
                  <div
                    key={event._id || i}
                    style={{
                      padding: "14px",
                      borderRadius: "12px",
                      background: "#F9FAFB",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderLeft: `6px solid ${color}`,
                    }}
                  >
                    <div>
                      <span style={{ color: "#1A1A1A", fontWeight: "600" }}>
                        {event.triggerType?.replace(/_/g, " ") || "Distress detected"}
                      </span>
                      {event.messageSnippet && (
                        <p
                          style={{
                            margin: "4px 0 0",
                            fontSize: "1.3rem",
                            opacity: 0.6,
                            color: "#1A1A1A",
                          }}
                        >
                          "{event.messageSnippet}"
                        </p>
                      )}
                      <p
                        style={{
                          margin: "4px 0 0",
                          fontSize: "1.2rem",
                          opacity: 0.5,
                          color: "#1A1A1A",
                        }}
                      >
                        {formatTime(event.timestamp)}
                      </p>
                    </div>
                    <span style={{ color, fontWeight: "600", flexShrink: 0 }}>
                      {label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── CONVERSATION LOGS ── */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", color: "#1A1A1A" }}>
            🗣️ Conversation Logs
          </h2>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {loading ? (
              <p style={{ opacity: 0.6, fontSize: "1.5rem" }}>Loading...</p>
            ) : conversationLogs.length === 0 ? (
              <p style={{ opacity: 0.6, fontSize: "1.5rem" }}>
                No conversation logs yet.
              </p>
            ) : (
              conversationLogs
                .slice()
                .reverse()
                .map((log, i) => (
                  <div
                    key={log._id || i}
                    style={{
                      padding: "14px",
                      borderRadius: "12px",
                      background: "#F8FAFF",
                      border: "1px solid #E0ECFF",
                      fontSize: "1.4rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ fontWeight: "600", color: "#1A1A1A" }}>
                        Session — {formatTime(log.startTime)}
                      </span>
                      <span
                        style={{
                          fontSize: "1.2rem",
                          color:
                            log.distressScore >= 5 ? "#DC2626" : "#16A34A",
                          fontWeight: "600",
                        }}
                      >
                        Distress: {log.distressScore ?? 0}
                      </span>
                    </div>
                    {/* Show last 2 messages from each session */}
                    {log.messages?.slice(-2).map((msg, j) => (
                      <div
                        key={j}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background:
                            msg.role === "ai" ? "#EAF4FF" : "#E7FEE9",
                          marginBottom: "6px",
                          fontSize: "1.3rem",
                          color: "#1A1A1A",
                        }}
                      >
                        <strong>
                          {msg.role === "ai" ? "AI" : "Patient"}:
                        </strong>{" "}
                        {msg.content}
                      </div>
                    ))}
                  </div>
                ))
            )}
          </div>
        </div>

        {/* ── HEALTH SUMMARY ── */}
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
              background: distressEvents.length === 0 ? "#F0FDF4" : "#FFF5F5",
              border: `1px solid ${
                distressEvents.length === 0 ? "#BBF7D0" : "#FECACA"
              }`,
              color: "#1A1A1A",
              fontSize: "1.5rem",
              lineHeight: "1.6",
            }}
          >
            {healthSummary}
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