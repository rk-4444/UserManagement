import React, { useState, useEffect } from "react";
import "../CSS/UserList.css";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from the database
    fetch("http://localhost:5000/userlist")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);
  console.log("Users state:", users);

  function handleClick() {}

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <div className="info">
                <span>
                  <strong>{user.name}</strong>
                </span>
                <Link className="detail" to={`/userdetail/${user.email}`}>
                  Detail Info
                </Link>
              </div>
              <div>{user.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
