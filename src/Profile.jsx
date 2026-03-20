import React from "react";
import "./Profile.css";
import { useDispatch } from "react-redux";
import { logout } from "./store/LoginSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { openLoginDialog } from "./store/LoginSlice";

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (!token || !user) {
    return (
      <div className="profile-not-logged">
        <div className="not-logged-card">
          <div className="not-logged-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2>You're not logged in</h2>
          <p>Please sign in to view your profile.</p>
          <button className="not-logged-btn" onClick={() => dispatch(openLoginDialog())}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Get initials from name
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const fields = [
    {
      label: "Email",
      value: user.email,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      label: "Phone",
      value: user.phone,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      label: "Date of Birth",
      value: new Date(user.DOB).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      label: "Gender",
      value: user.gender,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4"/><path d="M12 12v9"/><path d="M9 18h6"/>
        </svg>
      ),
    },
    {
      label: "Address",
      value: user.address,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
    {
      label: "Member Since",
      value: new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* Avatar */}
        <div className="profile-avatar-section">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-name-block">
            <h2 className="profile-name">{user.name}</h2>
            <span className="profile-badge">Member</span>
          </div>
        </div>

        <div className="profile-divider" />

        {/* Fields */}
        <div className="profile-fields">
          {fields.map((field) => (
            <div className="profile-field" key={field.label}>
              <div className="field-icon">{field.icon}</div>
              <div className="field-content">
                <span className="field-label">{field.label}</span>
                <span className="field-value">{field.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="profile-divider" />

        {/* Logout */}
        <button className="profile-logout-btn" onClick={handleLogout}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign Out
        </button>

      </div>
    </div>
  );
}

export default Profile;