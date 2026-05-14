import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Admin() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    const querySnapshot = await getDocs(collection(db, "participants"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setParticipants(data);
  };

  // TOTAL COUNT
  const totalParticipants = participants.length;

  // CITY ANALYTICS
  const cityCounts = {};

  participants.forEach((p) => {
    const city = p.city || "Unknown";

    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  // CSV DOWNLOAD
  const exportCSV = () => {
    const headers = [
      "Name",
      "Phone",
      "Area",
      "City",
      "Age",
      "Parent Phone",
      "Attendance",
    ];

    const rows = participants.map((p) => [
      p.name,
      p.phone,
      p.area,
      p.city,
      p.age,
      p.parentPhone,
      p.attendance,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "participants.csv";

    link.click();
  };

  // PDF DOWNLOAD
  const downloadPDF = () => {
    window.print();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ede9fe, #dbeafe)",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#6d28d9",
          }}
        >
          📊 Smart Summer Admin Dashboard
        </h1>

        {/* BUTTONS */}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              background: "#7c3aed",
              color: "white",
              cursor: "pointer",
              fontSize: "15px",
              marginRight: "10px",
            }}
          >
            ⬅ Back to Home
          </button>

          <button
            onClick={exportCSV}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontSize: "15px",
              marginRight: "10px",
            }}
          >
            ⬇ Download CSV
          </button>

          <button
            onClick={downloadPDF}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              background: "#dc2626",
              color: "white",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            📄 Download PDF
          </button>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle}>
            <h2>Total Enrollments</h2>

            <h1 style={{ color: "#7c3aed" }}>{totalParticipants}</h1>
          </div>

          <div style={cardStyle}>
            <h2>Cities Registered</h2>

            <h1 style={{ color: "#2563eb" }}>
              {Object.keys(cityCounts).length}
            </h1>
          </div>
        </div>

        {/* CITY ANALYTICS */}
        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2 style={{ color: "#6d28d9" }}>📍 Registrations by City</h2>

          {Object.entries(cityCounts).map(([city, count]) => (
            <div
              key={city}
              style={{
                marginTop: "15px",
              }}
            >
              <b>{city}</b> — {count} registrations
            </div>
          ))}
        </div>

        {/* PARTICIPANTS TABLE */}
        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            overflowX: "auto",
          }}
        >
          <h2 style={{ color: "#6d28d9" }}>👥 Participants</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#ede9fe",
                }}
              >
                <th style={tableStyle}>Name</th>
                <th style={tableStyle}>Phone</th>
                <th style={tableStyle}>Area</th>
                <th style={tableStyle}>City</th>
                <th style={tableStyle}>Age</th>
                <th style={tableStyle}>Attendance</th>
              </tr>
            </thead>

            <tbody>
              {participants.map((p) => (
                <tr key={p.id}>
                  <td style={tableStyle}>{p.name}</td>

                  <td style={tableStyle}>{p.phone}</td>

                  <td style={tableStyle}>{p.area}</td>

                  <td style={tableStyle}>{p.city}</td>

                  <td style={tableStyle}>{p.age}</td>

                  <td style={tableStyle}>{p.attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 0 10px rgba(0,0,0,0.08)",
};

const tableStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
};
