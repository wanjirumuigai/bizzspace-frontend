import React, { useState, useEffect } from "react";
import SpaceContainer from "./SpaceContainer";
import Search from "./Search";

function Home() {
  const [spaces, setSpaces] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const searchStyle = {
    // display: "flex",
    // padding: "20px",
    // justifyContent: "center",
    // gap: "50px",
    color: "black",
  };

  useEffect(() => {
    fetch("/spaces")
      .then((res) => res.json())
      .then((data) => {
        setSpaces(data);
        setSearchItems(data);
      });
  }, []);

  function handleSearch(e) {
    const searchMatch = spaces.filter(
      (item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.location.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchItems(searchMatch);
  }

  return (
    <div className="card" style={searchStyle}>
      {/* <img src="..." className="card-img-top" alt="..."/>THIS WILL BE BACKGROUND IMAGE */}
      <div className="searchfilterunderlayimage">
        <div className="card-body stylingfiltersearch">
          <h1 id="h1-in-search-div">Discover your next business space</h1>
          {/* <select name="filter">
            <option value="All">Filter listings by city</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Mombasa">Mombasa</option>
          </select> */}
          <Search handleSearch={handleSearch} />
        </div>
        <div className="search-filter-overlay"></div>
      </div>

      <div className="card-body menu-container">
        <SpaceContainer spaces={searchItems} setSpaces={setSpaces} />
      </div>
    </div>
  );
}

export default Home;
