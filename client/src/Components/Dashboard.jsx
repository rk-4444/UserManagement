// Dashboard.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/userform">User form</Link>
          </li>
          <li>
            <Link to="/userlist">User List</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
