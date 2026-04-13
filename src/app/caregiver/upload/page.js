// "use client";
// import Link from "next/link";
// import { useState } from "react";

// const palette = {
//   bg: "#D6E6FF",
//   card: "#FFFFFF",
//   text: "#1A1A1A",
//   accent: "#3373C4",
// };

// export default function UploadPage() {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleUpload = () => {
//     setLoading(true);

//     // simulate upload
//     setTimeout(() => {
//       setLoading(false);
//       setSuccess(true);

//       // reset after 2 sec (optional)
//       setTimeout(() => setSuccess(false), 2000);
//     }, 1500);
//   };

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         background: palette.bg,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "40px 20px",
//       }}
//     >
//       {/* TITLE */}
//       <h1
//         style={{
//           fontSize: "2.4rem",
//           color: "#1A1A1A",
//           marginBottom: "20px",
//           fontWeight: "700",
//           padding: "90px 30px 10px 30px",
//         }}
//       >
//         📸 Upload Family Photo
//       </h1>

//       {/* CARD */}
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "500px",
//           background: "linear-gradient(135deg, #FFFFFF, #F4F8FF)",
//           borderRadius: "28px",
//           padding: "28px",
//           boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
//           border: "1px solid #E3EEFF",
//           display: "flex",
//           flexDirection: "column",
//           gap: "20px",
//         }}
//       >
//         {/* FILE INPUT */}
//         <label
//           style={{
//             border: "2px dashed #AFCBFF",
//             borderRadius: "18px",
//             padding: "22px",
//             textAlign: "center",
//             cursor: "pointer",
//             background: "#F8FBFF",
//             color: "#1A1A1A",
//             fontSize: "1.4rem",
//           }}
//         >
//           📁 Click to upload image
//           <input type="file" style={{ display: "none" }} />
//         </label>

//         {/* NAME INPUT */}
//         <input
//           type="text"
//           placeholder="Enter name (e.g. Priya)"
//           style={{
//             padding: "14px",
//             borderRadius: "14px",
//             border: "1px solid #D6E6FF",
//             fontSize: "1.4rem",
//             color: "#1A1A1A",
//             background: "#FAFCFF",
//             outline: "none",
//           }}
//         />

//         {/* RELATION INPUT */}
//         <input
//           type="text"
//           placeholder="Enter relation (e.g. Daughter)"
//           style={{
//             padding: "14px",
//             borderRadius: "14px",
//             border: "1px solid #D6E6FF",
//             fontSize: "1.4rem",
//             color: "#1A1A1A",
//             background: "#FAFCFF",
//             outline: "none",
//           }}
//         />

//         {/* BUTTON */}
//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           style={{
//             marginTop: "10px",
//             padding: "16px",
//             borderRadius: "16px",
//             fontSize: "1.6rem",
//             fontWeight: "600",
//             border: "none",
//             cursor: loading ? "not-allowed" : "pointer",
//             color: "white",
//             background: success
//               ? "linear-gradient(135deg, #22C55E, #4ADE80)"
//               : "linear-gradient(135deg, #3373C4, #5A8DEE)",
//             boxShadow: success
//               ? "0 10px 25px rgba(34,197,94,0.4)"
//               : "0 10px 25px rgba(51,115,196,0.35)",
//             transition: "all 0.3s ease",
//             transform: loading ? "scale(0.98)" : "scale(1)",
//           }}
//         >
//           {loading
//             ? "Uploading..."
//             : success
//             ? "✔ Uploaded"
//             : "Upload"}
//         </button>
//       </div>

//       {/* BACK */}
//       <Link
//         href="/caregiver"
//         style={{
//           marginTop: "25px",
//           fontSize: "1.3rem",
//           color: "#1A1A1A",
//           opacity: 0.6,
//           textDecoration: "none",
//           borderBottom: "1px solid #1A1A1A",
//           paddingBottom: "2px",
//         }}
//       >
//         ← Back to Dashboard
//       </Link>
//     </main>
//   );
// }



"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const palette = {
  bg: "#D6E6FF",
  card: "#FFFFFF",
  text: "#1A1A1A",
  accent: "#3373C4",
};

export default function UploadPage() {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [personName, setPersonName] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // ─── Handle file selection + preview ─────────────────────────────────────
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // Validate file type
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(selected.type)) {
      setError("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }

    // Validate file size (max 5MB)
    if (selected.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setError("");
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // ─── Handle upload ────────────────────────────────────────────────────────
  const handleUpload = async () => {
    setError("");

    // Validate inputs
    if (!file) {
      setError("Please select an image.");
      return;
    }
    if (!personName.trim()) {
      setError("Please enter the person's name.");
      return;
    }
    if (!caption.trim()) {
      setError("Please enter a caption.");
      return;
    }

    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("patientId");

    if (!token || !patientId) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      // Must use multipart/form-data — NOT JSON
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("patientId", patientId);
      formData.append("caption", caption.trim());
      formData.append("personName", personName.trim());

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload/photo`,
        {
          method: "POST",
          headers: {
            // Do NOT set Content-Type here — browser sets it automatically
            // with the correct multipart boundary when using FormData
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Upload failed. Please try again.");
        setLoading(false);
        return;
      }

      // Success — reset form
      setSuccess(true);
      setFile(null);
      setPreview(null);
      setPersonName("");
      setCaption("");
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Reset success state after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <main
      style={{
        minHeight: "100vh",
        background: palette.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          fontSize: "2.4rem",
          color: "#1A1A1A",
          marginBottom: "20px",
          fontWeight: "700",
          padding: "90px 30px 10px 30px",
        }}
      >
        📸 Upload Family Photo
      </h1>

      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "linear-gradient(135deg, #FFFFFF, #F4F8FF)",
          borderRadius: "28px",
          padding: "28px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
          border: "1px solid #E3EEFF",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* ERROR */}
        {error && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              background: "#FFF5F5",
              border: "1px solid #FECACA",
              color: "#DC2626",
              fontSize: "1.3rem",
            }}
          >
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              background: "#F0FFF4",
              border: "1px solid #BBF7D0",
              color: "#16A34A",
              fontSize: "1.3rem",
              fontWeight: "600",
            }}
          >
            ✅ Photo uploaded successfully!
          </div>
        )}

        {/* FILE INPUT */}
        <label
          style={{
            border: "2px dashed #AFCBFF",
            borderRadius: "18px",
            padding: "22px",
            textAlign: "center",
            cursor: "pointer",
            background: "#F8FBFF",
            color: "#1A1A1A",
            fontSize: "1.4rem",
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          ) : (
            "📁 Click to upload image (JPG, PNG, WEBP — max 5MB)"
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>

        {/* PERSON NAME INPUT */}
        <input
          type="text"
          placeholder="Person's name (e.g. Priya)"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          style={{
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid #D6E6FF",
            fontSize: "1.4rem",
            color: "#1A1A1A",
            background: "#FAFCFF",
            outline: "none",
          }}
        />

        {/* CAPTION INPUT */}
        <input
          type="text"
          placeholder="Caption (e.g. This is your daughter Priya)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid #D6E6FF",
            fontSize: "1.4rem",
            color: "#1A1A1A",
            background: "#FAFCFF",
            outline: "none",
          }}
        />

        {/* UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "16px",
            borderRadius: "16px",
            fontSize: "1.6rem",
            fontWeight: "600",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            color: "white",
            background: success
              ? "linear-gradient(135deg, #22C55E, #4ADE80)"
              : loading
              ? "#A0AEC0"
              : "linear-gradient(135deg, #3373C4, #5A8DEE)",
            boxShadow: success
              ? "0 10px 25px rgba(34,197,94,0.4)"
              : "0 10px 25px rgba(51,115,196,0.35)",
            transition: "all 0.3s ease",
          }}
        >
          {loading ? "Uploading..." : success ? "✔ Uploaded" : "Upload"}
        </button>
      </div>

      {/* BACK */}
      <Link
        href="/caregiver"
        style={{
          marginTop: "25px",
          fontSize: "1.3rem",
          color: "#1A1A1A",
          opacity: 0.6,
          textDecoration: "none",
          borderBottom: "1px solid #1A1A1A",
          paddingBottom: "2px",
        }}
      >
        ← Back to Dashboard
      </Link>
    </main>
  );
}