import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Admin({ goBack }) {
  const [participants, setParticipants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

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
    const city =
      p.city
        ?.trim()
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase()) || "Unknown";

    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this participant?"
    );

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "participants", id));
    fetchParticipants();
  };

  // EDIT
  const handleEdit = (participant) => {
    setEditingId(participant.id);
    setEditData(participant);
  };

  // SAVE UPDATE
  const handleSave = async (id) => {
    await updateDoc(doc(db, "participants", id), {
      ...editData,
    });

    setEditingId(null);
    fetchParticipants();
  };

  // CSV DOWNLOAD
  const exportCSV = () => {
    const headers = [
      "Name",
      "Phone",
      "Area",
      "City",
      "Age",
      "Parent Phone",
      "Referred By",
      "Attendance",
    ];

    const rows = participants.map((p) => [
      p.name,
      p.phone,
      p.area,
      p.city,
      p.age,
      p.parentPhone,
      p.referredBy || "",
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
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <h1 style={{ textAlign: "center", color: "#6d28d9" }}>
          📊 Smart Summer Admin Dashboard
        </h1>

       {/* BUTTONS */}
<div
  style={{
    textAlign: "center",
    marginTop: "20px",
  }}
>
  <button onClick={goBack} style={buttonStyle("#111")}>
    ⬅ Back
  </button>

  <button onClick={exportCSV} style={buttonStyle("#2563eb")}>
    ⬇ Download CSV
  </button>

  <button onClick={downloadPDF} style={buttonStyle("#dc2626")}>
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
            <div key={city} style={{ marginTop: "15px" }}>
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
              <tr style={{ background: "#ede9fe" }}>
                <th style={tableStyle}>Name</th>
                <th style={tableStyle}>Phone</th>
                <th style={tableStyle}>Area</th>
                <th style={tableStyle}>City</th>
                <th style={tableStyle}>Age</th>
                <th style={tableStyle}>Referred By</th>
                <th style={tableStyle}>Attendance</th>
                <th style={tableStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {participants.map((p) => (
                <tr key={p.id}>
                  {editingId === p.id ? (
                    <>
                      <td style={tableStyle}>
                        <input
                          value={editData.name || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                        />
                      </td>

                      <td style={tableStyle}>
                        <input
                          value={editData.phone || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, phone: e.target.value })
                          }
                        />
                      </td>

                      <td style={tableStyle}>
                        <input
                          value={editData.area || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, area: e.target.value })
                          }
                        />
                      </td>

                      <td style={tableStyle}>
                        <input
                          value={editData.city || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, city: e.target.value })
                          }
                        />
                      </td>

                      <td style={tableStyle}>
                        <input
                          value={editData.age || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, age: e.target.value })
                          }
                        />
                      </td>

                      <td style={tableStyle}>
                        <input
                          value={editData.referredBy || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              referredBy: e.target.value,
                            })
                          }
                        />
                      </td>

                      <td style={tableStyle}>{editData.attendance || ""}</td>

                      <td style={tableStyle}>
                        <button
                          onClick={() => handleSave(p.id)}
                          style={saveButton}
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={tableStyle}>{p.name}</td>
                      <td style={tableStyle}>{p.phone}</td>
                      <td style={tableStyle}>{p.area}</td>
                      <td style={tableStyle}>{p.city}</td>
                      <td style={tableStyle}>{p.age}</td>
                      <td style={tableStyle}>{p.referredBy}</td>
                      <td style={tableStyle}>{p.attendance}</td>

                      <td style={tableStyle}>
                        <button
                          onClick={() => handleEdit(p)}
                          style={editButton}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          style={deleteButton}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// STYLES
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

const buttonStyle = (color) => ({
  padding: "12px 20px",
  border: "none",
  borderRadius: "10px",
  background: color,
  color: "white",
  cursor: "pointer",
  fontSize: "15px",
  marginRight: "10px",
});

const editButton = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  marginRight: "8px",
};

const deleteButton = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "8px",
  background: "#dc2626",
  color: "white",
  cursor: "pointer",
};

const saveButton = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "8px",
  background: "#16a34a",
  color: "white",
  cursor: "pointer",
};
