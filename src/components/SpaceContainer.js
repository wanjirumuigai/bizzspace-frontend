import React from "react";
import SpaceCard from "./SpaceCard";
import "../App.css";

function SpaceContainer({ spaces, setSpaces }) {
  return (
    <ul className="cards">
      <SpaceCard spaces={spaces} setSpaces={setSpaces} />
    </ul>
  );
}
export default SpaceContainer;
