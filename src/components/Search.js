import React from "react";

function Search({ handleSearch }) {
  function handleKeyUp(e) {
    handleSearch(e);
  }
  return (
    <div className="search">
      <label>
        <input
          onKeyUp={handleKeyUp}
          className="searchTerm"
          placeholder="Search space..."
        ></input>
      </label>
    </div>
  );
}
export default Search;
