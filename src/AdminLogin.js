import React, { useState } from "react";

export default function AdminLogin({ goHome, openDashboard }) {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "smartsummeradmin") {
      openDashboard(); // ✅ FIXED
    } else {
      alert("Wrong Password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #ede9fe, #dbeafe)",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "25px",
          width: "100%",
          maxWidth: "450px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        }}
      >
        <button
          onClick={goHome}
          style={{
            marginBottom: "25px",
            padding: "10px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#111",
            color: "white",
            cursor: "pointer",
            float: "left",
          }}
        >
          ⬅ Back
        </button>

        <div style={{ clear: "both" }}></div>

        <h1
          style={{
            color: "#6d28d9",
            marginBottom: "10px",
          }}
        >
          🔐 Admin Login
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Enter admin password to continue
        </p>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "25px",
            border: "none",
            borderRadius: "12px",
            background: "#7c3aed",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login to Dashboard
        </button>
      </div>
    </div>
  );
}
