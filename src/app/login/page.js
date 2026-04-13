// "use client";
// import { useState } from "react";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError("Please enter email and password");
//       return;
//     }
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Login failed");
//         setLoading(false);
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("caregiverId", data.caregiver.id);
//       localStorage.setItem("patientId", data.caregiver.patientIds[0]);

//       window.location.href = "/caregiver";

//     } catch (err) {
//       setError("Cannot connect to server. Make sure backend is running.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: "100vh",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       background: "#f0f4f8"
//     }}>
//       <div style={{
//         background: "white",
//         padding: "40px",
//         borderRadius: "16px",
//         width: "100%",
//         maxWidth: "400px",
//         boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
//       }}>
//         <h1 style={{ marginBottom: "8px", fontSize: "24px" }}>👋 Welcome Back</h1>
//         <p style={{ color: "#666", marginBottom: "24px" }}>Sign in to your caregiver account</p>

//         {error && (
//           <p style={{
//             color: "#e53e3e",
//             background: "#fff5f5",
//             padding: "10px",
//             borderRadius: "8px",
//             marginBottom: "16px",
//             fontSize: "14px"
//           }}>{error}</p>
//         )}

//         <input
//           type="email"
//           placeholder="Email address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{
//             display: "block",
//             width: "100%",
//             marginBottom: "12px",
//             padding: "12px",
//             borderRadius: "8px",
//             border: "1px solid #e2e8f0",
//             fontSize: "16px",
//             boxSizing: "border-box"
//           }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleLogin()}
//           style={{
//             display: "block",
//             width: "100%",
//             marginBottom: "20px",
//             padding: "12px",
//             borderRadius: "8px",
//             border: "1px solid #e2e8f0",
//             fontSize: "16px",
//             boxSizing: "border-box"
//           }}
//         />
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           style={{
//             width: "100%",
//             padding: "12px",
//             background: loading ? "#a0aec0" : "#6c63ff",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             fontSize: "16px",
//             cursor: loading ? "not-allowed" : "pointer"
//           }}
//         >
//           {loading ? "Signing in..." : "Sign In"}
//         </button>

//         <p style={{ marginTop: "20px", fontSize: "13px", color: "#888", textAlign: "center" }}>
//           Don't have an account? Ask your administrator.
//         </p>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("caregiverId", data.caregiver.id);

      if (data.caregiver.patientIds && data.caregiver.patientIds.length > 0) {
        localStorage.setItem("patientId", data.caregiver.patientIds[0]);
        window.location.href = "/caregiver";
      } else {
        // Caregiver has no patient yet
        window.location.href = "/caregiver/create-patient";
      }
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#D6E6FF",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: "8px", fontSize: "26px", color: "#0F233F" }}>
          👋 Welcome Back
        </h1>
        <p style={{ color: "#666", marginBottom: "28px", fontSize: "15px" }}>
          Sign in to your caregiver account
        </p>

        {error && (
          <div
            style={{
              color: "#DC2626",
              background: "#FFF5F5",
              border: "1px solid #FECACA",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          style={{ ...inputStyle, marginBottom: "24px" }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading
              ? "#A0AEC0"
              : "linear-gradient(135deg, #3373C4, #5A8DEE)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 8px 20px rgba(51,115,196,0.3)",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* REGISTER LINK */}
        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Link
            href="/register"
            style={{
              color: "#3373C4",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "14px",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #D6E6FF",
  fontSize: "15px",
  color: "#1A1A1A",
  outline: "none",
  boxSizing: "border-box",
  background: "#FAFCFF",
};