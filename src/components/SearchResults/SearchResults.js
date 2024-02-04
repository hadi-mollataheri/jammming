import React from "react";
import Tracklist from "../Tracklist/Tracklist.js";

function SearchResults(props) {
  return (
    <div className="search-results">
      <h2>Results</h2>
      <Tracklist tracks={props.fetchedTracks} addTrack={props.addTrack} />
    </div>
  );
}

export default SearchResults;
