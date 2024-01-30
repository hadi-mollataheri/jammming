import React, { useState } from "react";

function SearchBar() {
  // State for input form(controlled component)
  const [songName, setSongName] = useState("");

  const handleChange = ({ target }) => setSongName(target.value);
  const handleSubmit = (e) => e.preventDefault();
  return (
    <section role="search">
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchBar">ENTER THE SONG TITLE</label>
        <br />
        <input
          onChange={handleChange}
          id="searchBar"
          name="searchBar"
          type="text"
          value={songName}
        />
        <br />
        <button type="submit">SEARCH</button>
      </form>
    </section>
  );
}

export default SearchBar;
