"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const palette = {
  bg: "#D6E6FF",
  card: "#FFFFFF",
  text: "#0F233F",
  accent: "#3373C4",
  green: "#1F8A5C",
  red: "#DC2626",
  softBlue: "#F4FAFF",
};

const fakePhotos = [
  {
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    caption: "This is your daughter Priya. She loves you.",
  },
  {
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    caption: "This is your son Amit. He smiles when he sees you.",
  },
];

//const [started, setStarted] = useState(false);

export default function PatientPage() {
  const [now, setNow] = useState(new Date());
  const [listening, setListening] = useState(false);
  const [aiText, setAiText] = useState("Hello Ramesh. I am here with you.");
  const [history, setHistory] = useState([
    { by: "AI", text: "Hello Ramesh. I am here with you." },
  ]);
  //const [showPhotos, setShowPhotos] = useState(false);
  const [showRoutine, setShowRoutine] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const router = useRouter();
  const [showAI, setShowAI] = useState(false);

  const dateText = useMemo(
    () =>
      now.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [now],
  );
  const timeText = useMemo(
    () => now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    [now],
  );

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!showAI) return;

    const timer = setTimeout(() => {
      setShowAI(false);
    }, 180000); // 5 seconds

    return () => clearTimeout(timer);
  }, [showAI]);
  // useEffect(() => {
  //   if (!showPhotos) return;
  //   const t = setInterval(
  //     () => setPhotoIndex((p) => (p + 1) % fakePhotos.length),
  //     8000,
  //   );
  //   return () => clearInterval(t);
  // }, [showPhotos]);

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
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const aiReply = text.toLowerCase().includes("help")
        ? "You are safe. I will alert your caregiver."
        : "I hear you. I am here to help.";
      setHistory((prev) => [
        ...prev.slice(-4),
        { by: "You", text },
        { by: "AI", text: aiReply },
      ]);
      setAiText(aiReply);
      speak(aiReply);

      setShowAI(true);
    };
    recognition.start();
  };
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: palette.bg,
        padding: "24px",
        color: palette.text,
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "17px",
        }}
      >
        {/* SECTION 1: CENTERED GREETING */}
        <header
          style={{
            textAlign: "center",
            padding: "20px 20px",
            color: "#1A1A1A",
          }}
        >
          <h1
            style={{
              fontSize: "5rem",
              fontWeight: 900,
              margin: 0,
              lineHeight: 1,
            }}
          >
            {greeting}, Ramesh
          </h1>
          <p style={{ fontSize: "2.5rem", marginTop: "20px", opacity: 0.9 }}>
            Today is {dateText}
          </p>
          <p style={{ fontSize: "4rem", fontWeight: 700, marginTop: "10px" }}>
            {timeText}
          </p>
        </header>

        {/* SECTION 2: VOICE CHAT */}
        <section
          style={{
            background: palette.card,
            borderRadius: "40px",
            padding: "40px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <button
            onClick={() => {
              setStarted(true);
              startVoice();
            }}
            style={{
              width: "100%",
              minHeight: "180px",
              background: listening ? "#2563EB" : palette.green,
              color: "white",
              border: "none",
              borderRadius: "30px",
              fontSize: "4rem",
              fontWeight: 900,
              cursor: "pointer",

              // 👇 IMPORTANT for alignment
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {listening ? (
              "I am Listening..."
            ) : (
              <>
                <img
                  src="/mic.png" // 👈 put mic.png in public folder
                  alt="mic"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                  }}
                />
                <span>Talk to Me</span>
              </>
            )}
          </button>

          {showAI && (
            <div
              style={{
                marginTop: "30px",
                background: palette.softBlue,
                borderRadius: "24px",
                padding: "30px",
                border: "2px solid #D0E3FF",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: palette.accent,
                }}
              >
                AI Response
              </p>
              <p
                style={{
                  margin: "15px 0 0",
                  fontSize: "3.5rem", // 👈 bigger text
                  lineHeight: 1.4, // 👈 more spacing between lines
                  fontWeight: "600", // 👈 slightly bold
                }}
              >
                {aiText}
              </p>
            </div>
          )}

          <button
            onClick={() => speak("I have called for help.")}
            style={{
              width: "100%",
              marginTop: "20px",
              minHeight: "100px",
              borderRadius: "20px",
              border: "none",
              background: "#D32F2F",
              color: "white",
              fontSize: "2.5rem",
              fontWeight: 900,
              cursor: "pointer",

              // 👇 alignment
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <img
              src="/emergency.png" // 👈 add this image in public folder
              alt="emergency"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
              }}
            />
            <span>I Need Help</span>
          </button>
        </section>

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            onClick={() => router.push("/patient/photos")}
            style={{
              minHeight: "500px",
              borderRadius: "20px",
              border: "2px solid #D0E3FF",
              background: "#FFFFFF",
              padding: "20px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {/* HEADING */}
            <h2
              style={{
                fontSize: "3.5rem",
                fontWeight: "700",
                marginBottom: "20px",
                textAlign: "center",
                color: "#0F233F",
              }}
            >
              Family Photos
            </h2>

            {/* IMAGE */}
            <img
              src="/family.jpg" // 👈 your image (put in /public folder)
              alt="Family"
              style={{
                maxWidth: "100%",
                maxHeight: "350px",
                objectFit: "contain",
                borderRadius: "16px",
              }}
            />
          </div>

          <div
            onClick={() => {
              setShowRoutine(true);
              //setShowPhotos(false);
            }}
            style={{
              minHeight: "500px",
              borderRadius: "20px",
              border: "2px solid #D0E3FF",
              background: "#F4F8FF",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <h2
              style={{
                fontSize: "3.5rem",
                fontWeight: "700",
                marginBottom: "20px",
                textAlign: "center",
                color: "#0F233F",
              }}
            >
              Today's Routine
            </h2>

            <div style={{ display: "grid", gap: "12px" }}>
              {/* DONE ITEM */}
              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "#E8F9EE",
                  border: "2px solid #22C55E",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "2rem",
                }}
              >
                <span>
                  <strong>08:00</strong> — Wake up & stretch
                </span>
                <span style={{ color: "#22C55E" }}>✓ Done</span>
              </div>

              {/* PENDING */}
              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  border: "2px solid #B6D7FF",
                  fontSize: "2rem",
                }}
              >
                <strong>09:00</strong> — Take medicine
              </div>

              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  border: "2px solid #B6D7FF",
                  fontSize: "2rem",
                }}
              >
                <strong>12:30</strong> — Lunch
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: PHOTOS OR ROUTINE */}
        {/* {showPhotos && (
          <section
            style={{
              background: palette.card, borderRadius: "40px", padding: "40px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
                Your Family
              </h2>
              <div style={{ textAlign: "center" }}>
                <h2 style={{
                  fontSize: "2.8rem",
                  marginBottom: "30px",
                  fontWeight: "700"
                }}>
                  Your Family
                </h2>

                <div style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <img
                    src={fakePhotos[photoIndex].url}
                    alt="Family"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "500px",
                      objectFit: "contain",
                      borderRadius: "20px"
                    }}
                  />
                </div>

                <p style={{
                  marginTop: "20px",
                  fontSize: "2rem",
                  fontWeight: "500"
                }}>
                  {fakePhotos[photoIndex].caption}
                </p>
              </div>
              <p>{fakePhotos[photoIndex].caption}</p>
            </div>
          </section>
        )} */}

        {/* SECTION 4: HISTORY */}
        <section
          style={{
            background: palette.card,
            borderRadius: "40px",
            padding: "40px",
            opacity: 0.9,
          }}
        >
          <h2
            style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              marginBottom: "20px",
              //textAlign: "center",
              color: "#0F233F",
            }}
          >
            Recent Conversation
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {history.map((m, i) => (
              <div
                key={i}
                style={{
                  padding: "20px",
                  borderRadius: "20px",
                  background: m.by === "AI" ? "#EAF4FF" : "#E7FEE9",
                  fontSize: "1.8rem",
                }}
              >
                <strong>{m.by}:</strong> {m.text}
              </div>
            ))}
          </div>
        </section>

        <footer style={{ textAlign: "center", padding: "20px" }}>
          <Link
            href="/"
            style={{
              fontSize: "1.8rem",
              color: "#1A1A1A",
              textDecoration: "underline",
            }}
          >
            Back to Settings
          </Link>
        </footer>
      </div>
    </main>
  );
}
``;
