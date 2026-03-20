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
    url: "/family2.jpg",
    caption: "This is your daughter.",
  },
];

export default function PhotosPage() {
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <main style={{ background: palette.bg, padding: "24px", minHeight: "100vh" }}>
      
      <section style={{ 
        background: palette.card, 
        padding: "40px", 
        borderRadius: "40px",
        textAlign: "center"
      }}>
        
        <h2 style={{ fontSize: "3rem", marginBottom: "30px" }}>
          Your Family
        </h2>

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

        <p style={{ marginTop: "20px", fontSize: "2rem" }}>
          {fakePhotos[photoIndex].caption}
        </p>

        <button 
          onClick={() => setPhotoIndex((p) => (p + 1) % fakePhotos.length)}
          style={{
            marginTop: "20px",
            padding: "15px 30px",
            fontSize: "1.8rem",
            borderRadius: "12px",
            background: palette.accent,
            color: "#0B3D91",
            border: "none"
          }}
        >
          Next
        </button>

      </section>
    </main>
  );
}