import React from "react";
import Tracklist from "../Tracklist/Tracklist.js";
import styles from './SearchResults.module.css'

function SearchResults(props) {
  return (
    <div className={styles.searchResults}>
      <h2 className={styles.header}>Results</h2>
      <Tracklist
        tracks={props.fetchedTracks}
        onAdd={props.onAdd}
        isRemovable={props.isRemovable}
      />
    </div>
  );
}

export default SearchResults;
