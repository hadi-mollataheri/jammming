import React, { useCallback } from "react";

function SearchBar({ userSearchInput, onUserSearchInputChange, onSearch }) {
  const handleChange = useCallback(
    ({ target }) => onUserSearchInputChange(target.value),
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSearch(userSearchInput);
    },
    [onSearch, userSearchInput]
  );

  return (
    <section role="search">
      <label htmlFor="searchBar">ENTER THE SONG TITLE</label>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          id="searchBar"
          name="searchBar"
          type="text"
          value={userSearchInput}
        />
        <br />
        <button type="submit">SEARCH</button>
      </form>
    </section>
  );
}

export default SearchBar;
