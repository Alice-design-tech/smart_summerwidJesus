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

  const [success, setSuccess] = useState(false);

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

      setSuccess(true);

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

  // SUCCESS PAGE
  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #fbcfe8, #ddd6fe)",
          padding: "20px",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            width: "100%",
            maxWidth: "500px",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ color: "#7c3aed" }}>✅ Successfully Enrolled!</h1>

          <h2>Welcome to Smart Summer with Jesus 🌸</h2>

          <p>
            Thank you <b>{formData.name}</b> for registering.
          </p>

          <div
            style={{
              marginTop: "25px",
              textAlign: "left",
              background: "#f9fafb",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <p>
              <b>📍 Venue:</b> St. Mary's Retreat Center
            </p>

            <p>
              <b>📅 Date:</b> June 14 - June 16
            </p>

            <p>
              <b>⏰ Time:</b> 9:00 AM
            </p>

            <p>
              <b>🎒 Bring:</b> Bible, Notebook, Water Bottle
            </p>

            <p>
              <b>📞 Contact:</b> 9876543210
            </p>
          </div>

          <p
            style={{
              marginTop: "25px",
              color: "#666",
              fontStyle: "italic",
            }}
          >
            “Let your light shine before others.”
            <br />— Matthew 5:16 ✨
          </p>

          <button
            onClick={() => setSuccess(false)}
            style={{
              marginTop: "25px",
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              background: "#7c3aed",
              color: "white",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

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
          Smart Summer
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "gray",
          }}
        >
          With Jesus ✨
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
  boxSizing: "border-box",
};
