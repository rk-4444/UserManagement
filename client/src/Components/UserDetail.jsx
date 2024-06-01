import "../CSS/UserDetail.css"; // Import CSS file for styling
import React, { useState, useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserDetail() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) {
      return; // If user cancels, do nothing
    }

    setIsDeleting(true);
    // Send a DELETE request to your backend to delete the user
    await axios
      .delete(`http://localhost:5000/deleteuser/${id}`)
      .then((response) => {
        alert("User Deleted Successfully!");
        navigate("/userlist");
        // Handle any UI updates or r
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        // Handle any errors or display error messages to the user
      })
      .finally(() => {
        setIsDeleting(false);
        navigate("/userlist");
      });
  };

  useEffect(() => {
    // Fetch users from the database
    fetch(`http://localhost:5000/userdetail/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // data.dob = Date(data.dob).getDate();
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="user-form-container">
      <h2>User Detail</h2>
      <form>
        <div className="form-group">
          <label>Name: {user.name}</label>
        </div>
        <div className="form-group">
          <label>Date of Birth: {user.dob}</label>
        </div>
        <div className="form-group">
          <label>Contact Number: {user.contact}</label>
        </div>
        <div className="form-group">
          <label>Email: {user.email}</label>
        </div>
        <div className="form-group">
          <label>User Description: {user.desc}</label>
        </div>
      </form>
      <br />
      <br />

      <button className="update">
        <Link style={{ color: "white" }} to={`/updateuser/${user.email}`}>
          Update User
        </Link>
      </button>
      <button
        className="delete"
        onClick={handleDeleteUser}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete User"}
      </button>
    </div>
  );
}

export default UserDetail;
