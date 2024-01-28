import React from "react";
import Tracklist from "../Tracklist/Tracklist.js";

function SearchResults({ tracks }) {
  return (
    <div
      className="results"
      style={{ backgroundColor: "#6059E1", width: 300, height: 400 }}
    >
      <h2>Results</h2>
      <Tracklist tracklist={tracklist} />
    </div>
  );
}

export default SearchResults;
