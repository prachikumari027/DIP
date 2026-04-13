// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const palette = {
//   bg: "#D6E6FF",
//   card: "#FFFFFF",
//   accent: "#3373C4",
// };

// const fakePhotos = [
//   {
//     url: "/family.jpg",
//     caption: "This is your family.",
//   },
//   {
//     url: "/daughter.jpg",
//     caption: "This is your daughter.\nShe loves you very much.",
//   },
// ];

// export default function PhotosPage() {
//   const [photoIndex, setPhotoIndex] = useState(0);
//   const router = useRouter();

//   return (
//     <main
//       style={{
//         background: palette.bg,
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "40px",
//       }}
//     >
//       {/* 🔙 FIXED BACK */}
//       <div
//         onClick={() => router.back()}
//         style={{
//           position: "fixed",
//           top: "45px",
//           left: "45px",
//           background: palette.accent,
//           padding: "12px 20px",
//           borderRadius: "14px",
//           boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
//           cursor: "pointer",
//           fontSize: "1.6rem",
//           fontWeight: "600",
//           color: "white",
//           zIndex: 1000,
//         }}
//       >
//         ← Back
//       </div>

//       {/* CARD */}
//       <div
//         style={{
//           background: palette.card,
//           borderRadius: "15px",
//           width: "100%",
//           maxWidth: "1500px", // 👈 bigger width
//           padding: "60px", // 👈 more inner spacing
//           boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
//         }}
//       >
//         {/* TITLE */}
//         {/* TITLE WITH ICON */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "16px",
//             marginBottom: "50px",
//           }}
//         >
//           <img
//             src="/flower.jpg" // 👈 your PNG
//             alt="flower"
//             style={{
//               width: "90px",
//               height: "90px",
//               objectFit: "contain",
//             }}
//           />

//           <h2
//             style={{
//               fontSize: "3.8rem",
//               fontWeight: "800",
//               color: "#1A1A1A",
//               margin: 0,
//             }}
//           >
//             Your Family
//           </h2>
//         </div>

//         {/* LAYOUT */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "60px",
//             flexWrap: "wrap",
//           }}
//         >
//           {/* IMAGE */}
//           <img
//             src={fakePhotos[photoIndex].url}
//             alt="Family"
//             style={{
//               width: "450px", // 🔥 bigger image
//               maxWidth: "100%",
//               borderRadius: "24px",
//               objectFit: "cover",
//             }}
//           />

//           {/* TEXT */}
//           <div
//             style={{
//               flex: 1,
//               minWidth: "300px",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "flex-start",
//               gap: "25px", // 👈 controls spacing cleanly
//             }}
//           >
//             <p
//               style={{
//                 fontSize: "3rem",
//                 fontWeight: "600",
//                 lineHeight: "1.4",
//                 color: "#1A1A1A",
//                 whiteSpace: "pre-line",
//               }}
//             >
//               {fakePhotos[photoIndex].caption}
//             </p>

//             {/* BUTTON */}
//             <button
//               onClick={() => setPhotoIndex((p) => (p + 1) % fakePhotos.length)}
//               style={{
//                 marginTop: "50px", // 👈 reduced from 30px
//                 alignSelf: "flex-start", // 👈 ensures proper alignment
//                 padding: "20px 40px",
//                 fontSize: "2.2rem",
//                 fontWeight: "700",
//                 borderRadius: "18px",
//                 background: palette.accent,
//                 color: "white",
//                 border: "none",
//                 cursor: "pointer",
//                 boxShadow: "0 8px 20px rgba(51,115,196,0.4)",
//               }}
//             >
//               Next →
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const palette = {
  bg: "#D6E6FF",
  card: "#FFFFFF",
  accent: "#3373C4",
};

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // ─── Fetch photos from backend ────────────────────────────────────────────
  useEffect(() => {
    const patientId = localStorage.getItem("patientId");
    if (!patientId) {
      router.push("/login");
      return;
    }

    async function loadPhotos() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/patient/${patientId}/photos`
        );
        if (!res.ok) throw new Error("Failed to load photos");
        const data = await res.json();
        setPhotos(data.photos || []);
      } catch (err) {
        console.error("Photo fetch error:", err);
        setError("Could not load photos. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <main
      style={{
        background: palette.bg,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      {/* BACK BUTTON */}
      <div
        onClick={() => router.back()}
        style={{
          position: "fixed",
          top: "45px",
          left: "45px",
          background: palette.accent,
          padding: "12px 20px",
          borderRadius: "14px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
          cursor: "pointer",
          fontSize: "1.6rem",
          fontWeight: "600",
          color: "white",
          zIndex: 1000,
        }}
      >
        ← Back
      </div>

      {/* CARD */}
      <div
        style={{
          background: palette.card,
          borderRadius: "15px",
          width: "100%",
          maxWidth: "1500px",
          padding: "60px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
        }}
      >
        {/* TITLE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "50px",
          }}
        >
          <img
            src="/flower.jpg"
            alt="flower"
            style={{ width: "90px", height: "90px", objectFit: "contain" }}
          />
          <h2
            style={{
              fontSize: "3.8rem",
              fontWeight: "800",
              color: "#1A1A1A",
              margin: 0,
            }}
          >
            Your Family
          </h2>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <p style={{ fontSize: "2.5rem", textAlign: "center", opacity: 0.6 }}>
            Loading photos...
          </p>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <p style={{ fontSize: "2.5rem", textAlign: "center", color: "#DC2626" }}>
            {error}
          </p>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && photos.length === 0 && (
          <p style={{ fontSize: "2.5rem", textAlign: "center", opacity: 0.6 }}>
            No family photos uploaded yet.
          </p>
        )}

        {/* PHOTO DISPLAY */}
        {!loading && !error && photos.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "60px",
              flexWrap: "wrap",
            }}
          >
            {/* IMAGE */}
            <img
              src={photos[photoIndex].imageUrl}
              alt={photos[photoIndex].personName || "Family"}
              style={{
                width: "450px",
                maxWidth: "100%",
                borderRadius: "24px",
                objectFit: "cover",
              }}
            />

            {/* TEXT + BUTTON */}
            <div
              style={{
                flex: 1,
                minWidth: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "25px",
              }}
            >
              {/* Person name */}
              {photos[photoIndex].personName && (
                <p
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: palette.accent,
                    margin: 0,
                  }}
                >
                  {photos[photoIndex].personName}
                </p>
              )}

              {/* Caption */}
              <p
                style={{
                  fontSize: "3rem",
                  fontWeight: "600",
                  lineHeight: "1.4",
                  color: "#1A1A1A",
                  whiteSpace: "pre-line",
                  margin: 0,
                }}
              >
                {photos[photoIndex].caption}
              </p>

              {/* Photo counter */}
              <p style={{ fontSize: "1.6rem", opacity: 0.5, margin: 0 }}>
                {photoIndex + 1} of {photos.length}
              </p>

              {/* NEXT BUTTON — only show if more than 1 photo */}
              {photos.length > 1 && (
                <button
                  onClick={() =>
                    setPhotoIndex((p) => (p + 1) % photos.length)
                  }
                  style={{
                    marginTop: "50px",
                    alignSelf: "flex-start",
                    padding: "20px 40px",
                    fontSize: "2.2rem",
                    fontWeight: "700",
                    borderRadius: "18px",
                    background: palette.accent,
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 20px rgba(51,115,196,0.4)",
                  }}
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}