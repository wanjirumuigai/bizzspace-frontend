import React from "react";
import SpaceCard from "./SpaceCard";
import "../App.css";

function SpaceContainer({ spaces, setSpaces }) {
  console.log(spaces);
  return (
    <ul className="cards">
      <SpaceCard spaces={spaces} setSpaces={setSpaces} />
    </ul>
  );
}
export default SpaceContainer;
