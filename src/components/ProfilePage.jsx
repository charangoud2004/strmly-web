import React from "react";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const { state } = useLocation();
  const user = state?.user || "Unknown User";

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1 className="profile-title">Welcome to {user}'s Profile 👤</h1>
        <p className="profile-subtitle">This is just a dummy page.</p>
      </div>
    </div>
  );
};

export default ProfilePage;