import React from "react";
import Tracklist from "../Tracklist/Tracklist.js";

function SearchResults(props) {
  // console.log(props.fetchedTracks);
  return (
    <div className="search-results">
      <h2>Results</h2>
      <Tracklist
        tracks={props.fetchedTracks}
        onAdd={props.onAdd}
        isRemovable={props.isRemovable}
      />
    </div>
  );
}

export default SearchResults;
