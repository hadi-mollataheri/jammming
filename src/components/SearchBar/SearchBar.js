import React, { useCallback } from "react";
import styles from './SearchBar.module.css';

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
      <label className={styles.title} htmlFor="searchBar">ENTER THE SONG TITLE</label>
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
        <button className={styles.button} type="submit">SEARCH</button>
      </form>
    </section>
  );
}

export default SearchBar;
