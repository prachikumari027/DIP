// "use client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const palette = {
//   bg: "#D6E6FF",
//   card: "#FFFFFF",
//   text: "#0F233F",
//   accent: "#3373C4",
//   green: "#1F8A5C",
//   red: "#DC2626",
// };

// export default function CaregiverPage() {
//   const router = useRouter();
//   return (
//     <main style={{ minHeight: "100vh", background: palette.bg }}>
//       {/* ================= NAVBAR ================= */}

//       <div
//         style={{
//           width: "100%",
//           padding: "10px 30px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "14px",
//         }}
//       >
//         {/* ================= HEADER ================= */}
//         {/* <div
//           style={{
//             background: palette.card,
//             borderRadius: "20px",
//             boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//             padding: "20px",
//           }}
//         > */}
//         <h1
//           style={{
//             fontSize: "1.7rem",
//             fontWeight: "510",
//             margin: 0,
//             color: palette.accent,
//             textAlign: "left",
//             padding: "80px 20px 10px 20px",
//           }}
//         >
//           Caregiver Dashboard
//         </h1>

//         {/* ================= PATIENT INFO + ACTIVITY ================= */}
//         <div style={{ display: "flex", gap: "20px", alignItems: "stretch" }}>
//           {/* ================= LEFT: PATIENT INFO ================= */}
//           <div style={{ flex: 1 }}>
//             <div
//               style={{
//                 background: "linear-gradient(135deg, #FFFFFF, #F4F8FF)",
//                 borderRadius: "28px",
//                 padding: "28px",
//                 boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
//                 border: "1px solid #E3EEFF",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "22px",
//                 height: "100%",
//               }}
//             >
//               {/* HEADER WITH ICON */}
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "12px" }}
//               >
//                 <div
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     borderRadius: "14px",
//                     background: "#E6F0FF",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: "1.6rem",
//                   }}
//                 >
//                   👤
//                 </div>

//                 <h2
//                   style={{
//                     margin: 0,
//                     fontSize: "2.2rem",
//                     color: palette.accent,
//                     fontWeight: "700",
//                   }}
//                 >
//                   Patient Info
//                 </h2>
//               </div>

//               {/* NAME BLOCK */}
//               <div
//                 style={{
//                   background: "#EEF5FF",
//                   padding: "16px 18px",
//                   borderRadius: "16px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   fontSize: "1.6rem",
//                 }}
//               >
//                 <span style={{ opacity: 0.7, color: "#1A1A1A" }}>
//                   Patient Name
//                 </span>
//                 <strong style={{ fontSize: "1.8rem", color: "#1A1A1A" }}>
//                   Ramesh
//                 </strong>
//               </div>

//               {/* DETAILS */}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "18px",
//                   fontSize: "1.7rem",
//                   color: "#1A1A1A",
//                 }}
//               >
//                 {/* STATUS */}
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <span style={{ opacity: 0.6 }}>Status</span>

//                   <span
//                     style={{
//                       background: "#DCFCE7",
//                       color: "#16A34A",
//                       padding: "8px 18px",
//                       borderRadius: "999px",
//                       fontWeight: "700",
//                       fontSize: "1.4rem",
//                       boxShadow: "0 4px 12px rgba(34,197,94,0.25)",
//                     }}
//                   >
//                     🟢 Safe
//                   </span>
//                 </div>

//                 {/* LAST INTERACTION */}
//                 <div
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <span style={{ opacity: 0.6 }}>Last Interaction</span>
//                   <strong>2 mins ago</strong>
//                 </div>

//                 {/* ✅ PATIENT HISTORY (CLICKABLE) */}
//                 <div
//                   onClick={() => router.push("/caregiver/history")}
//                   style={{
//                     background: "#F8FAFF",
//                     borderRadius: "16px",
//                     padding: "16px",
//                     border: "1px solid #E0ECFF",
//                     marginTop: "5px",
//                     cursor: "pointer",
//                     transition: "0.2s",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "1.5rem",
//                       fontWeight: "600",
//                       marginBottom: "6px",
//                       color: "#1A1A1A",
//                     }}
//                   >
//                     📄 Patient History
//                   </div>

//                   <div
//                     style={{
//                       fontSize: "1.3rem",
//                       opacity: 0.7,
//                       color: "#1A1A1A",
//                     }}
//                   >
//                     View complete medical & activity details →
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ================= RIGHT: ACTIVITY ================= */}
//           <div
//             style={{
//               flex: 1,
//               borderRadius: "28px",
//               padding: "28px",
//               background: "linear-gradient(135deg, #FFFFFF, #F4F8FF)",
//               boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
//               border: "1px solid #E3EEFF",
//               display: "flex",
//               flexDirection: "column",
//               gap: "22px",
//               maxHeight: "500px", // ✅ LIMIT HEIGHT
//               overflowY: "auto", // ✅ ENABLE SCROLL
//             }}
//           >
//             {/* HEADER */}
//             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//               <div
//                 style={{
//                   width: "50px",
//                   height: "50px",
//                   borderRadius: "14px",
//                   background: "#E6F0FF",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: "1.6rem",
//                 }}
//               >
//                 📍
//               </div>

//               <h2
//                 style={{
//                   margin: 0,
//                   fontSize: "2.2rem",
//                   color: palette.accent,
//                   fontWeight: "700",
//                 }}
//               >
//                 Activity
//               </h2>
//             </div>

//             {/* LOCATION CARD */}
//             <div
//               style={{
//                 background: "#EEF5FF",
//                 padding: "16px 18px",
//                 borderRadius: "16px",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 fontSize: "1.6rem",
//                 color: "#1A1A1A",
//               }}
//             >
//               <span style={{ opacity: 0.7, color: "#1A1A1A" }}>
//                 Current Location
//               </span>
//               <strong>🏠 Home</strong>
//             </div>

//             {/* TIMELINE */}
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "18px",
//                 marginTop: "10px",
//                 maxHeight: "250px", // 👈 controls height
//                 overflowY: "auto", // 👈 enables scroll
//                 paddingRight: "8px", // 👈 avoids text cut by scrollbar
//               }}
//             >
//               {/* ITEM */}
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "14px",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "12px",
//                     height: "12px",
//                     borderRadius: "50%",
//                     background: "#3373C4",
//                     marginTop: "8px",
//                   }}
//                 />
//                 <div>
//                   <div
//                     style={{
//                       fontSize: "1.6rem",
//                       fontWeight: "600",
//                       color: "#1A1A1A",
//                     }}
//                   >
//                     🗣️ Talked to AI
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "1.3rem",
//                       opacity: 0.6,
//                       color: "#1A1A1A",
//                     }}
//                   >
//                     2 mins ago
//                   </div>
//                 </div>
//               </div>

//               {/* ITEM */}
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "14px",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "12px",
//                     height: "12px",
//                     borderRadius: "50%",
//                     background: "#DC2626",
//                     marginTop: "8px",
//                   }}
//                 />
//                 <div>
//                   <div
//                     style={{
//                       fontSize: "1.6rem",
//                       fontWeight: "600",
//                       color: "#1A1A1A",
//                     }}
//                   >
//                     💊 Missed medicine
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "1.3rem",
//                       opacity: 0.6,
//                       color: "#1A1A1A",
//                     }}
//                   >
//                     9:05 AM
//                   </div>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "14px",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "12px",
//                     height: "12px",
//                     borderRadius: "50%",
//                     background: "#3373C4",
//                     marginTop: "8px",
//                   }}
//                 />
//                 <div>
//                   <div
//                     style={{
//                       fontSize: "1.6rem",
//                       fontWeight: "600",
//                       color: "#1A1A1A",
//                     }}
//                   >
//                     🗣️ Talked to AI
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "1.3rem",
//                       opacity: 0.6,
//                       color: "#1A1A1A",
//                     }}
//                   >
//                     10 mins ago
//                   </div>
//                 </div>
//               </div>

//               {/* ITEM */}
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "14px",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "12px",
//                     height: "12px",
//                     borderRadius: "50%",
//                     background: "#1F8A5C",
//                     marginTop: "8px",
//                   }}
//                 />
//                 <div>
//                   <div
//                     style={{
//                       fontSize: "1.6rem",
//                       fontWeight: "600",
//                       color: "#1A1A1A",
//                     }}
//                   >
//                     🚶 Walked
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "1.3rem",
//                       opacity: 0.6,
//                       color: "#1A1A1A",
//                     }}
//                   >
//                     Yesterday
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* ================= ALERTS ================= */}
//         <div
//           style={{
//             background: "#FFFFFF",
//             borderRadius: "24px",
//             padding: "24px",
//             boxShadow: "0 15px 40px rgba(220,38,38,0.08)",
//             border: "1px solid #FFE2E2",
//             display: "flex",
//             flexDirection: "column",
//             gap: "18px",
//             minHeight: "400px",
//           }}
//         >
//           {/* HEADER (FIXED) */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <h2
//               style={{
//                 margin: 0,
//                 fontSize: "2.2rem",
//                 color: "#DC2626",
//                 fontWeight: "700",
//               }}
//             >
//               🚨 Alerts
//             </h2>

//             <span
//               style={{
//                 background: "#FEE2E2",
//                 color: "#DC2626",
//                 padding: "6px 14px",
//                 borderRadius: "999px",
//                 fontSize: "1.2rem",
//                 fontWeight: "600",
//               }}
//             >
//               3 Issues
//             </span>
//           </div>

//           {/* 👇 ONLY THIS PART SCROLLS */}
//           <div
//             style={{
//               maxHeight: "220px",
//               overflowY: "auto",
//               display: "flex",
//               flexDirection: "column",
//               gap: "14px",
//               paddingRight: "6px",
//             }}
//           >
//             {/* ALERT CARD 1 */}
//             <div
//               style={{
//                 background: "#FFF5F5",
//                 padding: "16px",
//                 borderRadius: "16px",
//                 border: "1px solid #FECACA",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "14px",
//               }}
//             >
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "12px",
//                   background: "#FEE2E2",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: "1.4rem",
//                 }}
//               >
//                 ⚠️
//               </div>

//               <div>
//                 <div
//                   style={{
//                     fontSize: "1.6rem",
//                     fontWeight: "600",
//                     color: "#1A1A1A",
//                   }}
//                 >
//                   Distress detected
//                 </div>
//                 <div
//                   style={{ fontSize: "1.3rem", opacity: 0.6, color: "#1A1A1A" }}
//                 >
//                   Short response at 10:14 AM
//                 </div>
//               </div>
//             </div>

//             {/* ALERT CARD 2 */}
//             <div
//               style={{
//                 background: "#EFF6FF",
//                 padding: "16px",
//                 borderRadius: "16px",
//                 border: "1px solid #BFDBFE",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "14px",
//               }}
//             >
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "12px",
//                   background: "#DBEAFE",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: "1.4rem",
//                 }}
//               >
//                 📍
//               </div>

//               <div>
//                 <div
//                   style={{
//                     fontSize: "1.6rem",
//                     fontWeight: "600",
//                     color: "#1A1A1A",
//                   }}
//                 >
//                   Location changed
//                 </div>
//                 <div
//                   style={{ fontSize: "1.3rem", opacity: 0.6, color: "#1A1A1A" }}
//                 >
//                   Patient moved outside home area
//                 </div>
//               </div>
//             </div>

//             {/* ALERT CARD 3 */}
//             <div
//               style={{
//                 background: "#FFFBEB",
//                 padding: "16px",
//                 borderRadius: "16px",
//                 border: "1px solid #FDE68A",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "14px",
//               }}
//             >
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "12px",
//                   background: "#FEF3C7",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: "1.4rem",
//                 }}
//               >
//                 💊
//               </div>

//               <div>
//                 <div
//                   style={{
//                     fontSize: "1.6rem",
//                     fontWeight: "600",
//                     color: "#1A1A1A",
//                   }}
//                 >
//                   Missed medicine
//                 </div>
//                 <div
//                   style={{ fontSize: "1.3rem", opacity: 0.6, color: "#1A1A1A" }}
//                 >
//                   9:05 AM
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================= BACK ================= */}
//         <div style={{ textAlign: "center", marginTop: "6px" }}>
//           <Link
//             href="/"
//             style={{
//               fontSize: "1.6rem",
//               color: palette.accent,
//               textDecoration: "underline",
//             }}
//           >
//             Back to Mode Selection
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

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

  const [patient, setPatient] = useState(null);
  const [distressEvents, setDistressEvents] = useState([]);
  const [conversationLogs, setConversationLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Live distress alerts received via socket
  const [liveAlerts, setLiveAlerts] = useState([]);

  const socketRef = useRef(null);

  // ─── Auth check + fetch data ──────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("patientId");
    const caregiverId = localStorage.getItem("caregiverId");

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
          // Show only unacknowledged events
          setDistressEvents(
            (d.events || []).filter((e) => !e.acknowledged)
          );
        }

        if (logsRes.ok) {
          const d = await logsRes.json();
          setConversationLogs(d.logs || []);
        }
      } catch (err) {
        console.error("Failed to load caregiver data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();

    // ─── Socket.io ──────────────────────────────────────────────────────────
    const socket = io(API);
    socketRef.current = socket;

    socket.emit("join_caregiver_room", caregiverId);

    socket.on("distress_alert", (data) => {
      setLiveAlerts((prev) => [data, ...prev]);
      // Also add to distress events list
      // setDistressEvents((prev) => [
      //   {
      //     _id: Date.now().toString(),
      //     triggerType: data.triggerType,
      //     messageSnippet: data.messageSnippet,
      //     distressScore: data.distressScore,
      //     timestamp: data.timestamp,
      //     acknowledged: false,
      //   },
      //   ...prev,
      // ]);

      setDistressEvents((prev) => [
        {
          _id: data._id || data.eventId,
          triggerType: data.triggerType,
          messageSnippet: data.messageSnippet,
          distressScore: data.distressScore,
          timestamp: data.timestamp,
          acknowledged: false,
        },
        ...prev,
      ]);
    });

    return () => socket.disconnect();
  }, []);

  // ─── Acknowledge distress event ───────────────────────────────────────────
  const acknowledgeEvent = async (eventId) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/caregiver/distress/${eventId}/acknowledge`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDistressEvents((prev) => prev.filter((e) => e._id !== eventId));
      setLiveAlerts((prev) => prev.filter((a) => a.patientId !== eventId));
    } catch (err) {
      console.error("Acknowledge error:", err);
    }
  };

  // ─── Derived: last interaction time ───────────────────────────────────────
  const lastInteraction = (() => {
    if (conversationLogs.length === 0) return "No interactions yet";
    const last = conversationLogs[conversationLogs.length - 1];
    const diff = Math.floor(
      (Date.now() - new Date(last.endTime).getTime()) / 60000
    );
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min${diff > 1 ? "s" : ""} ago`;
    const hrs = Math.floor(diff / 60);
    return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  })();

  // ─── Derived: activity feed from logs + distress ──────────────────────────
  const activityFeed = (() => {
    const items = [];

    conversationLogs.slice(-5).forEach((log) => {
      items.push({
        type: "ai",
        label: "🗣️ Talked to AI",
        time: log.endTime,
        color: palette.accent,
      });
    });

    distressEvents.slice(0, 5).forEach((event) => {
      items.push({
        type: "distress",
        label: `⚠️ ${event.triggerType?.replace(/_/g, " ") || "Distress detected"}`,
        time: event.timestamp,
        color: palette.red,
      });
    });

    // Sort by time descending
    items.sort((a, b) => new Date(b.time) - new Date(a.time));
    return items.slice(0, 6);
  })();

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const diff = Math.floor(
      (Date.now() - new Date(isoString).getTime()) / 60000
    );
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min${diff > 1 ? "s" : ""} ago`;
    const hrs = Math.floor(diff / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    return new Date(isoString).toLocaleDateString();
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <main style={{ minHeight: "100vh", background: palette.bg }}>
      <div
        style={{
          width: "100%",
          padding: "10px 30px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {/* HEADER */}
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

        {/* LIVE ALERT BANNER */}
        {liveAlerts.length > 0 && (
          <div
            style={{
              background: "#FFF0F0",
              border: "2px solid #DC2626",
              borderRadius: "16px",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong style={{ color: "#DC2626", fontSize: "1.5rem" }}>
                🚨 Live Alert: {liveAlerts[0].patientName}
              </strong>
              <p style={{ margin: "4px 0 0", fontSize: "1.3rem", color: "#1A1A1A" }}>
                {liveAlerts[0].messageSnippet} — Score: {liveAlerts[0].distressScore}
              </p>
            </div>
            <button
              onClick={() => setLiveAlerts([])}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                background: "#DC2626",
                color: "white",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* PATIENT INFO + ACTIVITY */}
        <div style={{ display: "flex", gap: "20px", alignItems: "stretch" }}>
          {/* LEFT: PATIENT INFO */}
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
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "50px", height: "50px", borderRadius: "14px",
                    background: "#E6F0FF", display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: "1.6rem",
                  }}
                >
                  👤
                </div>
                <h2 style={{ margin: 0, fontSize: "2.2rem", color: palette.accent, fontWeight: "700" }}>
                  Patient Info
                </h2>
              </div>

              {/* NAME */}
              <div
                style={{
                  background: "#EEF5FF", padding: "16px 18px", borderRadius: "16px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  fontSize: "1.6rem",
                }}
              >
                <span style={{ opacity: 0.7, color: "#1A1A1A" }}>Patient Name</span>
                <strong style={{ fontSize: "1.8rem", color: "#1A1A1A" }}>
                  {loading ? "Loading..." : patient?.name || "—"}
                </strong>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px", fontSize: "1.7rem", color: "#1A1A1A" }}>
                {/* AGE */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.6 }}>Age</span>
                  <strong>{loading ? "—" : patient?.age || "—"}</strong>
                </div>

                {/* STAGE */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.6 }}>Stage</span>
                  <strong style={{ textTransform: "capitalize" }}>
                    {loading ? "—" : patient?.cognitiveStage || "—"}
                  </strong>
                </div>

                {/* STATUS */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ opacity: 0.6 }}>Status</span>
                  <span
                    style={{
                      background: distressEvents.length > 0 ? "#FEE2E2" : "#DCFCE7",
                      color: distressEvents.length > 0 ? "#DC2626" : "#16A34A",
                      padding: "8px 18px", borderRadius: "999px",
                      fontWeight: "700", fontSize: "1.4rem",
                      boxShadow: distressEvents.length > 0
                        ? "0 4px 12px rgba(220,38,38,0.2)"
                        : "0 4px 12px rgba(34,197,94,0.25)",
                    }}
                  >
                    {distressEvents.length > 0 ? "🔴 Needs Attention" : "🟢 Safe"}
                  </span>
                </div>

                {/* LAST INTERACTION */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.6 }}>Last Interaction</span>
                  <strong>{loading ? "—" : lastInteraction}</strong>
                </div>

                {/* PATIENT HISTORY LINK */}
                <div
                  onClick={() => router.push("/caregiver/history")}
                  style={{
                    background: "#F8FAFF", borderRadius: "16px", padding: "16px",
                    border: "1px solid #E0ECFF", marginTop: "5px", cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "6px", color: "#1A1A1A" }}>
                    📄 Patient History
                  </div>
                  <div style={{ fontSize: "1.3rem", opacity: 0.7, color: "#1A1A1A" }}>
                    View complete medical & activity details →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ACTIVITY */}
          <div
            style={{
              flex: 1, borderRadius: "28px", padding: "28px",
              background: "linear-gradient(135deg, #FFFFFF, #F4F8FF)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
              border: "1px solid #E3EEFF",
              display: "flex", flexDirection: "column", gap: "22px",
              maxHeight: "500px", overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "50px", height: "50px", borderRadius: "14px",
                  background: "#E6F0FF", display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: "1.6rem",
                }}
              >
                📍
              </div>
              <h2 style={{ margin: 0, fontSize: "2.2rem", color: palette.accent, fontWeight: "700" }}>
                Activity
              </h2>
            </div>

            {/* TIMELINE */}
            <div
              style={{
                display: "flex", flexDirection: "column", gap: "18px",
                marginTop: "10px", maxHeight: "350px", overflowY: "auto", paddingRight: "8px",
              }}
            >
              {loading ? (
                <p style={{ fontSize: "1.4rem", opacity: 0.6 }}>Loading activity...</p>
              ) : activityFeed.length === 0 ? (
                <p style={{ fontSize: "1.4rem", opacity: 0.6 }}>No activity yet.</p>
              ) : (
                activityFeed.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "12px", height: "12px", borderRadius: "50%",
                        background: item.color, marginTop: "8px", flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: "1.6rem", fontWeight: "600", color: "#1A1A1A" }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: "1.3rem", opacity: 0.6, color: "#1A1A1A" }}>
                        {formatTime(item.time)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ALERTS */}
        <div
          style={{
            background: "#FFFFFF", borderRadius: "24px", padding: "24px",
            boxShadow: "0 15px 40px rgba(220,38,38,0.08)",
            border: "1px solid #FFE2E2",
            display: "flex", flexDirection: "column", gap: "18px",
            minHeight: "400px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: "2.2rem", color: "#DC2626", fontWeight: "700" }}>
              🚨 Alerts
            </h2>
            <span
              style={{
                background: "#FEE2E2", color: "#DC2626",
                padding: "6px 14px", borderRadius: "999px",
                fontSize: "1.2rem", fontWeight: "600",
              }}
            >
              {distressEvents.length} {distressEvents.length === 1 ? "Issue" : "Issues"}
            </span>
          </div>

          <div
            style={{
              maxHeight: "220px", overflowY: "auto",
              display: "flex", flexDirection: "column", gap: "14px", paddingRight: "6px",
            }}
          >
            {loading ? (
              <p style={{ fontSize: "1.4rem", opacity: 0.6 }}>Loading alerts...</p>
            ) : distressEvents.length === 0 ? (
              <div
                style={{
                  padding: "20px", borderRadius: "16px",
                  background: "#F0FFF4", border: "1px solid #BBF7D0",
                  fontSize: "1.5rem", color: "#16A34A", textAlign: "center",
                }}
              >
                ✅ No active alerts
              </div>
            ) : (
              distressEvents.map((event) => (
                <div
                  key={event._id}
                  style={{
                    background: "#FFF5F5", padding: "16px", borderRadius: "16px",
                    border: "1px solid #FECACA",
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", gap: "14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div
                      style={{
                        width: "40px", height: "40px", borderRadius: "12px",
                        background: "#FEE2E2", display: "flex",
                        alignItems: "center", justifyContent: "center", fontSize: "1.4rem",
                        flexShrink: 0,
                      }}
                    >
                      ⚠️
                    </div>
                    <div>
                      <div style={{ fontSize: "1.6rem", fontWeight: "600", color: "#1A1A1A" }}>
                        {event.triggerType?.replace(/_/g, " ") || "Distress detected"}
                      </div>
                      <div style={{ fontSize: "1.3rem", opacity: 0.6, color: "#1A1A1A" }}>
                        {event.messageSnippet} — {formatTime(event.timestamp)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => acknowledgeEvent(event._id)}
                    style={{
                      padding: "8px 14px", borderRadius: "10px",
                      border: "none", background: "#DC2626",
                      color: "white", fontSize: "1.2rem",
                      cursor: "pointer", flexShrink: 0,
                    }}
                  >
                    Acknowledge
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* BACK */}
        <div style={{ textAlign: "center", marginTop: "6px" }}>
          <Link href="/" style={{ fontSize: "1.6rem", color: palette.accent, textDecoration: "underline" }}>
            Back to Mode Selection
          </Link>
        </div>
      </div>
    </main>
  );
}