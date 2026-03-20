"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const palette = {
  bg: "#0914ed",
  card: "#FFFFFF",
  text: "#0F233F",
  accent: "#3373C4",
  green: "#1F8A5C",
  red: "#DC2626",
  softBlue: "#F4FAFF",
};

const fakePhotos = [
  { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80", caption: "This is your daughter Priya. She loves you." },
  { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80", caption: "This is your son Amit. He smiles when he sees you." },
];

export default function PatientPage() {
  const [now, setNow] = useState(new Date());
  const [listening, setListening] = useState(false);
  const [aiText, setAiText] = useState("Hello Ramesh. I am here with you.");
  const [history, setHistory] = useState([{ by: "AI", text: "Hello Ramesh. I am here with you." }]);
  const [showPhotos, setShowPhotos] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const dateText = useMemo(() => now.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" }), [now]);
  const timeText = useMemo(() => now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), [now]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!showPhotos) return;
    const t = setInterval(() => setPhotoIndex((p) => (p + 1) % fakePhotos.length), 8000);
    return () => clearInterval(t);
  }, [showPhotos]);

  // FIXED: Removed ": string" type annotation
  const speak = (text) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  // FIXED: Removed "as any" type castings
  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const aiReply = text.toLowerCase().includes("help") ? "You are safe. I will alert your caregiver." : "I hear you. I am here to help.";
      setHistory((prev) => [...prev.slice(-4), { by: "You", text }, { by: "AI", text: aiReply }]);
      setAiText(aiReply);
      speak(aiReply);
    };
    recognition.start();
  };

  return (
    <main style={{ minHeight: "100vh", background: palette.bg, padding: "24px", color: palette.text }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* SECTION 1: CENTERED GREETING */}
        <header style={{ textAlign: "center", padding: "40px 20px", color: "white" }}>
          <h1 style={{ fontSize: "5rem", fontWeight: 900, margin: 0, lineHeight: 1 }}>
            Good morning, Ramesh
          </h1>
          <p style={{ fontSize: "2.5rem", marginTop: "20px", opacity: 0.9 }}>
            Today is {dateText}
          </p>
          <p style={{ fontSize: "4rem", fontWeight: 700, marginTop: "10px" }}>
            {timeText}
          </p>
        </header>

        {/* SECTION 2: VOICE CHAT */}
        <section style={{ background: palette.card, borderRadius: "40px", padding: "40px", boxShadow: "0 15px 40px rgba(0,0,0,0.2)", textAlign: "center" }}>
          <button 
            onClick={startVoice} 
            style={{ 
              width: "100%", 
              minHeight: "180px", 
              background: listening ? palette.red : palette.green, 
              color: "white", 
              border: "none", 
              borderRadius: "30px", 
              fontSize: "4rem", 
              fontWeight: 900, 
              cursor: "pointer"
            }}
          >
            {listening ? "I am Listening..." : "Talk to Me"}
          </button>
          
          <div style={{ marginTop: "30px", background: palette.softBlue, borderRadius: "24px", padding: "30px", border: `3px solid ${palette.accent}` }}>
            <p style={{ margin: 0, fontSize: "2.5rem", fontWeight: 800, color: palette.accent }}>AI Response</p>
            <p style={{ margin: "15px 0 0", fontSize: "2.2rem", lineHeight: 1.3 }}>{aiText}</p>
          </div>

          <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <button onClick={() => { setShowPhotos(true); speak("Showing family photos."); }} style={{ minHeight: "100px", borderRadius: "20px", border: `4px solid ${palette.accent}`, background: "white", fontSize: "2rem", fontWeight: 700 }}>Family Photos</button>
            <button onClick={() => setShowPhotos(false)} style={{ minHeight: "100px", borderRadius: "20px", border: `4px solid ${palette.accent}`, background: "white", fontSize: "2rem", fontWeight: 700 }}>Show Routine</button>
          </div>
          
          <button onClick={() => speak("I have called for help.")} style={{ width: "100%", marginTop: "20px", minHeight: "100px", borderRadius: "20px", border: "none", background: palette.red, color: "white", fontSize: "2.5rem", fontWeight: 900 }}>EMERGENCY HELP</button>
        </section>

        {/* SECTION 3: PHOTOS OR ROUTINE */}
        <section style={{ background: palette.card, borderRadius: "40px", padding: "40px", boxShadow: "0 15px 40px rgba(0,0,0,0.2)" }}>
          {showPhotos ? (
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Your Family</h2>
              <img src={fakePhotos[photoIndex].url} alt="Family" style={{ width: "100%", height: "500px", borderRadius: "24px", objectFit: "cover" }} />
              <p style={{ marginTop: "20px", fontSize: "2.5rem", fontWeight: 600 }}>{fakePhotos[photoIndex].caption}</p>
              <button onClick={() => setPhotoIndex((p) => (p + 1) % fakePhotos.length)} style={{ marginTop: "20px", minHeight: "80px", minWidth: "250px", borderRadius: "20px", background: palette.accent, color: "white", fontSize: "2rem", border: "none" }}>Next Photo</button>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Today's Routine</h2>
              <div style={{ display: "grid", gap: "15px" }}>
                {[{ time: "08:00", text: "Wake up & stretch", done: true }, { time: "09:00", text: "Take medicine", done: false }, { time: "12:30", text: "Lunch", done: false }].map((item, index) => (
                  <div key={index} style={{ padding: "25px", borderRadius: "20px", background: item.done ? "#E8F9EE" : "#F4F8FF", fontSize: "2.2rem", border: `3px solid ${item.done ? "#22C55E" : "#B6D7FF"}`, display: "flex", justifyContent: "space-between" }}>
                    <span><strong>{item.time}</strong> — {item.text}</span>
                    {item.done && <span style={{ color: "#22C55E" }}>✓ Done</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* SECTION 4: HISTORY */}
        <section style={{ background: palette.card, borderRadius: "40px", padding: "40px", opacity: 0.9 }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "20px", opacity: 0.7 }}>Recent Conversation</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {history.map((m, i) => (
              <div key={i} style={{ padding: "20px", borderRadius: "20px", background: m.by === "AI" ? "#EAF4FF" : "#E7FEE9", fontSize: "1.8rem" }}>
                <strong>{m.by}:</strong> {m.text}
              </div>
            ))}
          </div>
        </section>

        <footer style={{ textAlign: "center", padding: "20px" }}>
          <Link href="/" style={{ fontSize: "1.8rem", color: "white", textDecoration: "underline" }}>Back to Settings</Link>
        </footer>
      </div>
    </main>
  );
}``