"use client";
import { useState, useEffect } from "react";

const palette = {
  bg: "#D6E6FF",
  card: "#FFFFFF",
  accent: "#3373C4",
};

const fakePhotos = [
  {
    url: "/family.jpg", // 👈 put your image in /public folder
    caption: "This is your family.",
  },
  {
    url: "/daughter.jpg",
    caption: (
      <>
        This is your daughter.
        <br />
        She loves you very much.
      </>
    ),
  },
];

export default function PhotosPage() {
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <main
      style={{ background: palette.bg, padding: "24px", minHeight: "100vh" }}
    >
      <section
        style={{
          background: palette.card,
          padding: "40px",
          borderRadius: "40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            marginBottom: "30px",
            color: "#1A1A1A",
            fontSize: "3.5rem",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Your Family
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={fakePhotos[photoIndex].url}
            alt="Family"
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
              objectFit: "contain",
              borderRadius: "20px",
            }}
          />
        </div>

        <p
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
            color: "#1A1A1A",
            fontSize: "3.5rem",
            fontWeight: "500",
            textAlign: "center",
            whiteSpace: "pre-line",
            lineSpacing: "1px",
          }}
        >
          {fakePhotos[photoIndex].caption}
        </p>

        <button
          onClick={() => setPhotoIndex((p) => (p + 1) % fakePhotos.length)}
          style={{
            marginTop: "10px",
            padding: "25px 25px",
            fontSize: "2.5rem",
            fontWeight: "700",
            borderRadius: "15px",
            background: palette.accent,
            color: "white",
            border: "none",
            width: "30%",
            minHeight: "100px",
            letterSpacing: "2px",
          }}
        >
          Next
        </button>
      </section>
    </main>
  );
}
