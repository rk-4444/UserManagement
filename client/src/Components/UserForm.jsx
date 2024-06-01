import React, { useState } from "react";
import "../CSS/UserForm.css"; // Import CSS file for styling

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contact: "",
    email: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, you can send the formData to your server or perform any other action here
    console.log(formData);

    try {
      // Send the user data to the backend server
      const response = await fetch("http://localhost:5000/userform", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle response
      if (response.ok) {
        const data = await response.json();
        console.log("User saved:", data);
        setFormData({
          name: "",
          dob: "",
          contact: "",
          email: "",
          desc: "",
        });
        alert("User registered Successfully!");
        // Optionally, you can reset the form fields here
      } else {
        console.error("Failed to save user:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving user:", error.message);
    }
  };

  return (
    <div className="user-form-container">
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="tel"
            name="contact"
            maxLength={10}
            minLength={10}
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>User Description:</label>
          <textarea name="desc" value={formData.desc} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
