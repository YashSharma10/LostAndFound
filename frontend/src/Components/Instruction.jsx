import React from "react";
import "./Instruction.css";

export default function Instruction() {
  return (
    <div className="instruction-container">
      <h2>How to Use the Application</h2>
      <p className="intro-text">
        Welcome to our Lost & Found application! Follow the steps below to get started:
      </p>
      
      <ol className="instruction-list">
        <li>
          <strong>Report a Lost Item:</strong> If you've lost an item, click on "Report an Item" to fill out a form with details about the item. Provide accurate information to help others identify it.
        </li>
        <li>
          <strong>Browse Found Items:</strong> If you've found an item, browse through the "Found Items" section to see if it matches your description. You can also report found items here.
        </li>
        <li>
          <strong>Browse Lost Items:</strong> Check the "Lost Items" section to see if someone has reported losing an item you found. If you find a match, you can claim it or contact the owner.
        </li>
        <li>
          <strong>Claim an Item:</strong> Found an item that belongs to you? Click on the "Claim" button and follow the instructions to confirm your ownership.
        </li>
      </ol>

      <h3>Roadmap</h3>
      <p className="roadmap-intro">
        Here's a quick overview of the process:
      </p>
      <div className="roadmap">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-description">Report or Find an Item</div>
        </div>
        <div className="arrow">→</div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-description">Browse Items</div>
        </div>
        <div className="arrow">→</div>
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-description">Claim or Contact</div>
        </div>
      </div>
    </div>
  );
}
