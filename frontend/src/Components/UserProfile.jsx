import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import "./UserProfile.css";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get("http://localhost:6005/login/success", { withCredentials: true })
      .then((response) => {
        console.log("User data:", response.data); // Debugging statement
        setUserData(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return (
      <div>
        <p>Please <a href="/auth/google">sign in with Google</a> to access your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-pic-container">
          <div className="profile-pic">
            {userData.image ? (
              <img src={userData.image} alt="Profile" className="user-pic" />
            ) : (
              <FaUser className="user-pic-icon" />
            )}
          </div>
        </div>
        <div className="profile-box">
          <div className="profile-details">
            <h2>{userData.displayName}</h2>
            <p>{userData.email}</p>
          </div>
          <div className="profile-buttons">
            <button className="profile-btn">Edit Profile</button>
            <button className="profile-btn">Edit Post</button>
          </div>
        </div>
      </div>

      <div className="posted-detail">
        <h3 className="posted-heading">Posted</h3>
        <table className="posts-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Date Lost</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {userData.reports && userData.reports.length > 0 ? (
              userData.reports.map((post, index) => (
                <tr key={index}>
                  <td>
                    <div className="post-photo">
                      {post.photoUrl ? (
                        <img src={post.photoUrl} alt={post.itemName} />
                      ) : (
                        <FaUser className="post-pic-icon" />
                      )}
                    </div>
                  </td>
                  <td>{post.itemName}</td>
                  <td>{new Date(post.date).toLocaleDateString()}</td>
                  <td>{post.location}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No posts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
