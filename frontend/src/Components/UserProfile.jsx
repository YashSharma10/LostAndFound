import React, { useState } from "react";
import "./UserProfile.css";
import { FaUser } from "react-icons/fa";

export default function UserProfile() {
  // Assuming static or pre-loaded user data
  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    posts: [
      {
        itemName: "Lost Wallet",
        date: "2024-08-10",
        location: "Cafe 1",
      },
      {
        itemName: "Lost Keys",
        date: "2024-08-08",
        location: "Sport Room",
      },
    ],
  });

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-pic-container">
          <div className="profile-pic">
            <FaUser className="user-pic-icon" />
          </div>
        </div>
        <div className="profile-box">
          <div className="profile-details">
            <h2>{userData.name}</h2>
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
            {userData.posts.map((post, index) => (
              <tr key={index}>
                <td>
                  <div className="post-photo"></div>
                </td>
                <td>{post.itemName}</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
                <td>{post.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
