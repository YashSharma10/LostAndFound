import React from "react";
import Try from "../Components/Try";
import Glass from "../Components/Glass";
import "./Home.css";
import lossImage from "../Assets/loss.png";
import foundImage from "../Assets/found.png";
import findImage from "../Assets/find.png";
import { FaExclamationCircle, FaCheckCircle, FaSearch } from 'react-icons/fa';

function Home() {
  return (
    <>
      <div className="homepage">
        <Try />
      </div>
      <div className="home">
        <Glass
          title="Report an Item"
          subtitle="Report"
          imageSrc={lossImage}
          to="/Report"
        />
        <Glass
          title="Browse Found items"
          subtitle="Report"
          imageSrc={foundImage}
          to="/founditm"
        />
        <Glass
          title="Browse Lost Items"
          subtitle="Browse"
          imageSrc={findImage}
          to="/Lostitm"
        />
      </div>
      <div className="instructions">
        <h2>How to Use the Lost and Found Website</h2>
        <div className="instruction-card">
          <FaExclamationCircle className="instruction-icon" />
          <h3>Report a Item</h3>
          <p>If you've lost an item or found any item, click on "Report an Item" to report it. Provide a detailed description and upload an image if available to help others identify it.</p>
        </div>
        <div className="instruction-card">
          <FaSearch className="instruction-icon" />
          <h3>Browse Items</h3>
          <p>Click on "Lost Item" or "Found Item"to search through the list of lost and items. Use filters or keywords to quickly locate the item you're looking for.</p>
        </div>
      </div>
    </>
  );
}

export default Home;
