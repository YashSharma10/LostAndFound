import React from "react";
import Try from "../Components/Try";
import Glass from "../Components/Glass";
import "./Home.css";
import lossImage from "../Assets/loss.png";
import foundImage from "../Assets/found.png";
import findImage from "../Assets/find.png";
import Instruction from "../Components/Instruction";

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
<Instruction />
    </>
  );
}

export default Home;
