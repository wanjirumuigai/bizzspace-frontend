import React, { useState, useEffect } from "react";
import SpaceContainer from "./SpaceContainer";

function Home() {
  const searchStyle = {
    // display: "flex",
    // padding: "20px",
    // justifyContent: "center",
    // gap: "50px",
    color: "black",
  };

  return (
    <div className="card" style={searchStyle}>
      {/* <img src="..." class="card-img-top" alt="..."/>THIS WILL BE BACKGROUND IMAGE */}
      <div className="searchfilterunderlayimage">
        <div className="card-body stylingfiltersearch">
          <h1 id="h1-in-search-div">Discover your next business space</h1>
          <select name="filter">
            <option value="All">Filter listings by city</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Mombasa">Mombasa</option>
          </select>

          <input
            id="searchinput"
            type="text"
            name="search"
            placeholder="🔍Search..."
          />
        </div>
        <div class="search-filter-overlay"></div>
      </div>

      <div className="card-body menu-container">
        <SpaceContainer />
      </div>
    </div>
  );
}

export default Home;
