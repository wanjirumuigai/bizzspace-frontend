import React from "react";

function Search({ handleSearch }) {
  function handleKeyUp(e) {
    handleSearch(e);
  }
  return (
    <div className="search">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="search-space"
          style={{"height": "50px"}}
        />
        <span class="input-group-text span-search" id="search-space">
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
