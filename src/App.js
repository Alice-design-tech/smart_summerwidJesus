import React, { useState } from "react";
import Registration from "./Registration";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";
import logo from "./logo.png";

export default function App() {
  const [page, setPage] = useState("home");

  // HOME PAGE
  if (page === "home") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #fbcfe8, #ddd6fe, #bfdbfe)",
          fontFamily: "Arial",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "25px",
            width: "100%",
            maxWidth: "500px",
            textAlign: "center",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />

          <h1 style={{ color: "#7c3aed", marginBottom: "10px" }}>
            Smart Summer
          </h1>

          <p style={{ color: "#666", marginBottom: "40px" }}>With Jesus ✨</p>

          <button
            onClick={() => setPage("registration")}
            style={buttonStyle("#7c3aed")}
          >
            Candidate Registration
          </button>

          <button
            onClick={() => setPage("adminlogin")}
            style={{
              ...buttonStyle("#111"),
              marginTop: "20px",
            }}
          >
            Admin Login
          </button>
        </div>
      </div>
    );
  }

    if (page === "home") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div>
          <img src={logo} alt="logo" style={{ width: 120 }} />

          <h1>Smart Summer</h1>

          <button onClick={() => setPage("registration")}>
            Candidate Registration
          </button>

          <button onClick={() => setPage("adminlogin")}>
            Admin Login
          </button>
        </div>
      </div>
    );
  }

  // USER REGISTRATION
  if (page === "registration") {
    return <Registration goHome={() => setPage("home")} />;
  }

  // ADMIN ENTRY REGISTRATION
  if (page === "adminregistration") {
    return (
      <Registration
        goHome={() => setPage("home")}
        goBack={() => setPage("adminlogin")}
        isAdmin={true}
        openAdmin={() => setPage("admin")}
      />
    );
  }

  // ADMIN LOGIN
  if (page === "adminlogin") {
    return (
      <AdminLogin
        goHome={() => setPage("home")}
        openDashboard={() => setPage("adminregistration")}
      />
    );
  }

  // ADMIN DASHBOARD
  if (page === "admin") {
    return <Admin goBack={() => setPage("adminregistration")} />;
  }

  return null;
}

// BUTTON STYLE
const buttonStyle = (bg) => ({
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "12px",
  background: bg,
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
});
