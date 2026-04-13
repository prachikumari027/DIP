// "use client";
// import Link from "next/link";
// import { useState } from "react";

// export default function RoutinePage() {
//   const [tasks, setTasks] = useState([
//     { time: "08:00", task: "Wake up", done: false },
//     { time: "09:00", task: "Medicine", done: false },
//     { time: "12:30", task: "Lunch", done: false },
//     { time: "15:00", task: "Walk", done: false },
//     { time: "18:30", task: "Dinner", done: false },
//   ]);

//   const toggleDone = (index) => {
//     const updated = [...tasks];
//     updated[index].done = !updated[index].done;
//     setTasks(updated);
//   };

//   const completed = tasks.filter((t) => t.done).length;
//   const progress = (completed / tasks.length) * 100;

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
//           maxWidth: "700px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "24px",
//         }}
//       >
//         {/* HEADER */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <h1
//               style={{
//                 fontSize: "2.8rem",
//                 fontWeight: "700",
//                 color: "#1A1A1A",
//                 marginBottom: "6px",
//                 padding: "90px 30px 10px 30px",
//               }}
//             >
//               📅 Today's Routine
//             </h1>

//             <div
//               style={{
//                 fontSize: "1.4rem",
//                 color: "#1A1A1A",
//                 opacity: 0.7,
//               }}
//             >
//               {completed} of {tasks.length} tasks completed
//             </div>
//           </div>

//           {/* ADD BUTTON */}
//           <button
//             style={{
//               padding: "12px 18px",
//               borderRadius: "14px",
//               border: "none",
//               background: "linear-gradient(135deg, #3373C4, #5A8DEE)",
//               color: "white",
//               fontSize: "1.3rem",
//               fontWeight: "600",
//               cursor: "pointer",
//               boxShadow: "0 8px 20px rgba(51,115,196,0.3)",
//             }}
//           >
//             + Add
//           </button>
//         </div>

//         {/* PROGRESS BAR */}
//         <div
//           style={{
//             width: "100%",
//             height: "10px",
//             background: "#E5EDFF",
//             borderRadius: "999px",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               width: `${progress}%`,
//               height: "100%",
//               background: "linear-gradient(90deg, #3373C4, #5A8DEE)",
//               transition: "0.3s",
//             }}
//           />
//         </div>

//         {/* TASK LIST */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//           {tasks.map((item, index) => (
//             <div
//               key={index}
//               style={{
//                 background: "#FFFFFF",
//                 borderRadius: "20px",
//                 padding: "18px 20px",
//                 boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               {/* LEFT */}
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "16px",
//                   alignItems: "center",
//                 }}
//               >
//                 {/* TIME */}
//                 <div
//                   style={{
//                     background: "#EEF5FF",
//                     padding: "6px 12px",
//                     borderRadius: "10px",
//                     fontSize: "1.2rem",
//                     color: "#1A1A1A",
//                   }}
//                 >
//                   {item.time}
//                 </div>

//                 {/* TASK */}
//                 <div
//                   style={{
//                     fontSize: "1.6rem",
//                     fontWeight: "600",
//                     color: "#1A1A1A",
//                     textDecoration: item.done ? "line-through" : "none",
//                     opacity: item.done ? 0.5 : 1,
//                   }}
//                 >
//                   {item.task}
//                 </div>
//               </div>

//               {/* BUTTON */}
//               <button
//                 onClick={() => toggleDone(index)}
//                 style={{
//                   padding: "10px 16px",
//                   borderRadius: "12px",
//                   border: "none",
//                   fontSize: "1.2rem",
//                   cursor: "pointer",
//                   background: item.done ? "#22C55E" : "#3373C4",
//                   color: "white",
//                 }}
//               >
//                 {item.done ? "✔ Done" : "Done"}
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* BACK */}
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


"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoutinePage() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [patientName, setPatientName] = useState("");

  // Add task form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [formError, setFormError] = useState("");

  // ─── Fetch routine on mount ───────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("patientId");

    if (!token || !patientId) {
      router.push("/login");
      return;
    }

    const API = process.env.NEXT_PUBLIC_API_URL;

    async function loadRoutine() {
      try {
        const res = await fetch(`${API}/api/patient/${patientId}/routine`);
        if (!res.ok) throw new Error("Failed to load routine");
        const data = await res.json();
        setPatientName(data.name || "");
        setTasks(data.dailyRoutine || []);
      } catch (err) {
        console.error("Routine load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRoutine();
  }, []);

  // ─── Toggle task done (caregiver can also mark done) ─────────────────────
  const toggleDone = async (index) => {
    const patientId = localStorage.getItem("patientId");
    const task = tasks[index];
    if (!task._id) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/patient/${patientId}/routine/${task._id}`,
        { method: "PATCH" }
      );
      const updated = [...tasks];
      updated[index] = { ...updated[index], completed: !updated[index].completed };
      setTasks(updated);
    } catch (err) {
      console.error("Toggle done error:", err);
    }
  };

  // ─── Save full updated routine to backend ─────────────────────────────────
  const saveRoutine = async (updatedTasks) => {
    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("patientId");
    setSaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/caregiver/patient/${patientId}/routine`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dailyRoutine: updatedTasks.map((t) => ({
              time: t.time,
              activity: t.activity,
            })),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to save routine");
      const data = await res.json();
      // Refresh tasks with the backend's returned routine (has _ids)
      setTasks(data.dailyRoutine || updatedTasks);
    } catch (err) {
      console.error("Save routine error:", err);
    } finally {
      setSaving(false);
    }
  };

  // ─── Add new task ─────────────────────────────────────────────────────────
  const handleAddTask = async () => {
    setFormError("");

    if (!newTime) {
      setFormError("Please enter a time.");
      return;
    }
    if (!newActivity.trim()) {
      setFormError("Please enter an activity.");
      return;
    }

    const newTask = { time: newTime, activity: newActivity.trim(), completed: false };
    const updatedTasks = [...tasks, newTask].sort((a, b) =>
      a.time.localeCompare(b.time)
    );

    setTasks(updatedTasks);
    setNewTime("");
    setNewActivity("");
    setShowAddForm(false);
    await saveRoutine(updatedTasks);
  };

  // ─── Delete task ──────────────────────────────────────────────────────────
  const handleDelete = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    await saveRoutine(updatedTasks);
  };

  // ─── Progress ─────────────────────────────────────────────────────────────
  const completed = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;

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
          maxWidth: "700px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2.8rem",
                fontWeight: "700",
                color: "#1A1A1A",
                marginBottom: "6px",
                padding: "90px 30px 10px 30px",
              }}
            >
              📅 {patientName ? `${patientName}'s` : "Today's"} Routine
            </h1>
            <div style={{ fontSize: "1.4rem", color: "#1A1A1A", opacity: 0.7, paddingLeft: "30px" }}>
              {loading
                ? "Loading..."
                : `${completed} of ${tasks.length} tasks completed`}
            </div>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => setShowAddForm((v) => !v)}
            style={{
              padding: "12px 18px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg, #3373C4, #5A8DEE)",
              color: "white",
              fontSize: "1.3rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(51,115,196,0.3)",
              marginTop: "60px",
            }}
          >
            {showAddForm ? "✕ Cancel" : "+ Add"}
          </button>
        </div>

        {/* ADD TASK FORM */}
        {showAddForm && (
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.6rem", color: "#1A1A1A" }}>
              New Task
            </h3>

            {formError && (
              <p style={{ color: "#DC2626", fontSize: "1.3rem", margin: 0 }}>
                {formError}
              </p>
            )}

            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #D6E6FF",
                fontSize: "1.3rem",
                color: "#1A1A1A",
                outline: "none",
              }}
            />

            <input
              type="text"
              placeholder="Activity (e.g. Take morning medicine)"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #D6E6FF",
                fontSize: "1.3rem",
                color: "#1A1A1A",
                outline: "none",
              }}
            />

            <button
              onClick={handleAddTask}
              disabled={saving}
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                background: saving ? "#A0AEC0" : "#3373C4",
                color: "white",
                fontSize: "1.3rem",
                fontWeight: "600",
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "Saving..." : "Save Task"}
            </button>
          </div>
        )}

        {/* PROGRESS BAR */}
        <div
          style={{
            width: "100%",
            height: "10px",
            background: "#E5EDFF",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #3373C4, #5A8DEE)",
              transition: "0.3s",
            }}
          />
        </div>

        {/* TASK LIST */}
        {loading ? (
          <p style={{ fontSize: "1.6rem", opacity: 0.6, textAlign: "center" }}>
            Loading routine...
          </p>
        ) : tasks.length === 0 ? (
          <p style={{ fontSize: "1.6rem", opacity: 0.6, textAlign: "center" }}>
            No tasks yet. Click "+ Add" to create one.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {tasks.map((item, index) => (
              <div
                key={item._id || index}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "18px 20px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                {/* LEFT: time + task */}
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div
                    style={{
                      background: "#EEF5FF",
                      padding: "6px 12px",
                      borderRadius: "10px",
                      fontSize: "1.2rem",
                      color: "#1A1A1A",
                      flexShrink: 0,
                    }}
                  >
                    {item.time}
                  </div>
                  <div
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "600",
                      color: "#1A1A1A",
                      textDecoration: item.completed ? "line-through" : "none",
                      opacity: item.completed ? 0.5 : 1,
                    }}
                  >
                    {item.activity}
                  </div>
                </div>

                {/* RIGHT: done + delete */}
                <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                  <button
                    onClick={() => toggleDone(index)}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      background: item.completed ? "#22C55E" : "#3373C4",
                      color: "white",
                    }}
                  >
                    {item.completed ? "✔ Done" : "Done"}
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      background: "#FEE2E2",
                      color: "#DC2626",
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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