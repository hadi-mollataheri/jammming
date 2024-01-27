import React from "react";

function SearchBar() {
  return (
    <form>
      <label htmlFor="searchBar">ENTER THE SONG TITLE</label>
      <br />
      <input id="searchBar" type="text" />
      <br />
      <button type='submit'>SEARCH</button>
    </form>
  );
}

export default SearchBar;
