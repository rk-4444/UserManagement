import React, { useState, useEffect } from "react";
import "../CSS/UserForm.css"; // Import CSS file for styling
import { useParams } from "react-router-dom";

function UpdateUser() {
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Fetch users from the database
    fetch(`http://localhost:5000/userdetail/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const dt =
          data.dob[8] +
          data.dob[9] +
          "/" +
          data.dob[5] +
          data.dob[6] +
          "/" +
          data.dob[0] +
          data.dob[1] +
          data.dob[2] +
          data.dob[3];
        data.dob = dt;
        setUser(data);
        // console.log(user);
        // console.log(data.dob);
        // console.log(data);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    // console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, you can send the formData to your server or perform any other action here
    console.log(user);

    try {
      // Send the user data to the backend server
      const response = await fetch(`http://localhost:5000/updateuser/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // Handle response
      if (response.ok) {
        const data = await response.json();
        alert("Information updated successfully!");
        // console.log("User saved:", data);

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
      <h2>Update User</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="text"
              name="dob"
              value={user.dob}
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
              value={user.contact}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>User Description:</label>
            <textarea name="desc" value={user.desc} onChange={handleChange} />
          </div>
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
}

export default UpdateUser;
