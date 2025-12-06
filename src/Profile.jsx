import React from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  // Get user + token directly from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Not logged in
  if (!token || !user) {
    return (
      <div className="profile-not-logged">
        <h2>You must be logged in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>My Profile <FontAwesomeIcon icon={faIdCard} /></h2>

      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Date of Birth:</strong> {new Date(user.DOB).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Joined On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default Profile;
