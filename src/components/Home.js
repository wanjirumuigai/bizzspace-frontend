import React, { useState, useEffect } from "react";
import SpaceContainer from "./SpaceContainer";
import Search from "./Search";

function Home() {
  const [spaces, setSpaces] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const url = "https://bizzspace-api.onrender.com";
  const [isLoaded, setIsLoaded] = useState(false);
  // const url = "https://bizzspace-api.onrender.com/";
  const searchStyle = {
    // display: "flex",
    // padding: "20px",
    // justifyContent: "center",
    // gap: "50px",
    color: "black",
  };

  useEffect(() => {
    fetch(`${url}/spaces`)
      .then((res) => res.json())
      .then((data) => {
        setSpaces(data);
        setSearchItems(data);
        setIsLoaded(true);
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
  if (!isLoaded)
    return (
      <>
        <h3>Loading ...</h3>
        <div class="loader">
          <span id="span"></span>
          <span id="span"></span>
          <span id="span"></span>
          <span id="span"></span>
        </div>
      </>
    );
  return (
    <div className="card" style={searchStyle}>
      {/* <img src="..." className="card-img-top" alt="..."/>THIS WILL BE BACKGROUND IMAGE */}
      <div className="searchfilterunderlayimage">
        <div className="card-body stylingfiltersearch">
          <h1 id="h1-in-search-div">Discover your next business space</h1>

          <Search handleSearch={handleSearch} />
        </div>

        <div className="card-body menu-container">
          <SpaceContainer spaces={searchItems} setSpaces={setSpaces} />
        </div>
      </div>
    </div>
  );
}

export default Home;
