"use client";
import Link from "next/link";
import { useState } from "react";

export default function RoutinePage() {
  const [tasks, setTasks] = useState([
    { time: "08:00", task: "Wake up", done: false },
    { time: "09:00", task: "Medicine", done: false },
    { time: "12:30", task: "Lunch", done: false },
    { time: "15:00", task: "Walk", done: false },
    { time: "18:30", task: "Dinner", done: false },
  ]);

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const completed = tasks.filter((t) => t.done).length;
  const progress = (completed / tasks.length) * 100;

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
      {/* CONTAINER */}
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
              📅 Today's Routine
            </h1>

            <div
              style={{
                fontSize: "1.4rem",
                color: "#1A1A1A",
                opacity: 0.7,
              }}
            >
              {completed} of {tasks.length} tasks completed
            </div>
          </div>

          {/* ADD BUTTON */}
          <button
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
            }}
          >
            + Add
          </button>
        </div>

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
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {tasks.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "18px 20px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* LEFT */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                {/* TIME */}
                <div
                  style={{
                    background: "#EEF5FF",
                    padding: "6px 12px",
                    borderRadius: "10px",
                    fontSize: "1.2rem",
                    color: "#1A1A1A",
                  }}
                >
                  {item.time}
                </div>

                {/* TASK */}
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "600",
                    color: "#1A1A1A",
                    textDecoration: item.done ? "line-through" : "none",
                    opacity: item.done ? 0.5 : 1,
                  }}
                >
                  {item.task}
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => toggleDone(index)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  background: item.done ? "#22C55E" : "#3373C4",
                  color: "white",
                }}
              >
                {item.done ? "✔ Done" : "Done"}
              </button>
            </div>
          ))}
        </div>

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