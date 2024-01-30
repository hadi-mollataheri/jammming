import React, { useState, useEffect } from "react";
import Track from "../Track/Track.js";

function SearchResults({ fetchedTracks }) {
  const [arrOfTracks, setArrOfTracks] = useState([]);

  useEffect(() => {
    setArrOfTracks(fetchedTracks);
    return setArrOfTracks([]);
  }, [fetchedTracks]);

  return (
    <div
      className="playlist"
      style={{ backgroundColor: "#6059E1", width: 300, height: 400 }}
    >
      <h2>Results</h2>
      {arrOfTracks.map((track) => {
        return <Track key={track.id} track={track} />;
      })}
    </div>
  );
}

export default SearchResults;
