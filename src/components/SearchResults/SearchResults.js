import React, { useState } from "react";
import Tracklist from "../Tracklist/Tracklist.js";

function SearchResults({ groupOfTracks }) {
  return (
    <div
      className="results"
      style={{ backgroundColor: "#6059E1", width: 300, height: 400 }}
    >
      <h2>Results</h2>
      <hr />
      <Tracklist tracks={groupOfTracks} />
    </div>
  );
}

export default SearchResults;
