import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Registration({ goHome, goBack, isAdmin, openAdmin }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    city: "",
    age: "",
    parentPhone: "",
    referredBy: "",
    attendance: "First Time",
  });

  const handleBack = () => {
    if (isAdmin) {
      goBack(); // goes to adminlogin
    } else {
      goHome(); // normal users go home
    }
  };

  const [success, setSuccess] = useState(false);

  const [timeLeft, setTimeLeft] = useState("");

  const citySuggestions = [
    "Coimbatore",
    "Chennai",
    "Madurai",
    "Trichy",
    "Salem",
    "Erode",
    "Tirupur",
    "Pollachi",
    "Thanjavur",
    "Karur",
    "Namakkal",
    "Nilgiris",
  ];

  // COUNTDOWN
  useEffect(() => {
    const targetDate = new Date("May 21, 2026 07:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
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

      setSuccess(true);

      setFormData({
        name: "",
        phone: "",
        area: "",
        city: "",
        age: "",
        parentPhone: "",
        referredBy: "",
        attendance: "First Time",
      });
    } catch (error) {
      console.error(error);

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
            width: "100%",
            maxWidth: "500px",
            textAlign: "center",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ color: "#7c3aed" }}>✅ Successfully Enrolled!</h1>

          <h2>Welcome to Smart Summer 🌸</h2>

          <p>
            Thank you <b>{formData.name}</b> for registering.
          </p>

          <div
            style={{
              marginTop: "25px",
              background: "#f9fafb",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "left",
            }}
          >
            <p>
              <b>📍 Venue:</b> Thangamani Marriage Hall, Thudiyalur, CBE
            </p>

            <p>
              <b>📅 Date:</b> May 21 - May 25
            </p>

            <p>
              <b>⏰ Time:</b> Starts at 7:00 AM
            </p>

            <p>
              <b>🎒 Bring:</b> Bible, Notebook, Plate, Water Bottle
            </p>

            <p>
              <b>📞 Contact:</b> 9597233332
            </p>
          </div>

          <button
  onClick={isAdmin ? goBack : goHome}
  style={{
    marginTop: "25px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#7c3aed",
    color: "white",
    cursor: "pointer",
  }}
>
  Back
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
       <button
  onClick={isAdmin ? goBack : goHome}
  style={{
    marginTop: "25px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#7c3aed",
    color: "white",
    cursor: "pointer",
  }}
>
  Back
</button>

        <h1
          style={{
            textAlign: "center",
            color: "#7c3aed",
          }}
        >
          Candidate Registration
        </h1>

        {/* COUNTDOWN */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "15px",
            background: "#ede9fe",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#6d28d9" }}>Retreat Starts In</h3>

          <h2>{timeLeft}</h2>
        </div>

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
            name="area"
            placeholder="Area"
            value={formData.area}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* CITY DROPDOWN */}
          <input
            list="cities"
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <datalist id="cities">
            {citySuggestions.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>

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

          <input
            type="text"
            name="referredBy"
            placeholder="Referred By"
            value={formData.referredBy}
            onChange={handleChange}
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
          {isAdmin && (
            <button
              type="button"
              onClick={openAdmin}
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "20px",
                border: "none",
                borderRadius: "10px",
                background: "#111",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Open Admin Dashboard
            </button>
          )}
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
