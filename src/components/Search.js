import React from "react";

function Search({ handleSearch }) {
  function handleKeyUp(e) {
    handleSearch(e);
  }
  return (
    <div className="search">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="search-space"
          style={{"height": "50px"}}
        />
        <span className="input-group-text span-search" id="search-space">
          Search
        </span>
      </div>
      {/* <label>
        <input
          onKeyUp={handleKeyUp}
          className="searchTerm form-control"
          placeholder="Search space..."
        ></input>
      </label> */}
    </div>
  );
}
export default Search;
