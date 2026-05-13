import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    place: "",
    age: "",
    parentPhone: "",
    attendance: "First Time",
  });

  const [participants, setParticipants] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("participants");

    if (saved) {
      setParticipants(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "participants"), {
        ...formData,
        createdAt: new Date(),
      });

      alert("Enrollment Submitted Successfully!");

      setFormData({
        name: "",
        phone: "",
        place: "",
        age: "",
        parentPhone: "",
        attendance: "First Time",
      });
    } catch (error) {
      console.error("Error adding document: ", error);

      alert("Something went wrong!");
    }
  };

  const exportCSV = () => {
    const headers = [
      "Name",
      "Phone",
      "Place",
      "Age",
      "Parent Phone",
      "Attendance",
    ];

    const rows = participants.map((p) => [
      p.name,
      p.phone,
      p.place,
      p.age,
      p.parentPhone,
      p.attendance,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "participants.csv";

    link.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fbcfe8, #ddd6fe, #bfdbfe)",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#7c3aed",
          }}
        >
          Smart Summer with Jesus
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "gray",
          }}
        >
          Register now.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="place"
            placeholder="Place"
            value={formData.place}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="tel"
            name="parentPhone"
            placeholder="Parent Phone Number"
            value={formData.parentPhone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <div style={{ marginTop: "15px" }}>
            <label>
              <input
                type="radio"
                name="attendance"
                value="First Time"
                checked={formData.attendance === "First Time"}
                onChange={handleChange}
              />
              First Time
            </label>

            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                name="attendance"
                value="Attended Before"
                checked={formData.attendance === "Attended Before"}
                onChange={handleChange}
              />
              Attended Before
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "20px",
              border: "none",
              borderRadius: "10px",
              background: "#7c3aed",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Enroll Now
          </button>
        </form>

        <div style={{ marginTop: "30px" }}>
          <button onClick={() => setShowAdmin(!showAdmin)} style={adminButton}>
            {showAdmin ? "Hide Admin Panel" : "Show Admin Panel"}
          </button>

          <button
            onClick={exportCSV}
            style={{
              ...adminButton,
              background: "#2563eb",
              marginLeft: "10px",
            }}
          >
            Export CSV
          </button>
        </div>

        {showAdmin && (
          <div style={{ marginTop: "30px" }}>
            <h2 style={{ color: "#7c3aed" }}>Registered Participants</h2>

            <table
              border="1"
              cellPadding="10"
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Place</th>
                  <th>Age</th>
                  <th>Attendance</th>
                </tr>
              </thead>

              <tbody>
                {participants.map((p, index) => (
                  <tr key={index}>
                    <td>{p.name}</td>
                    <td>{p.phone}</td>
                    <td>{p.place}</td>
                    <td>{p.age}</td>
                    <td>{p.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "15px",
};

const adminButton = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "10px",
  background: "#7c3aed",
  color: "white",
  cursor: "pointer",
};
