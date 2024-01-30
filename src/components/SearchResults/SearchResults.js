import React, { useState, useEffect } from "react";
import Track from "../Track/Track.js";

function SearchResults({ fetchedTracks }) {
  const [arrOfTracks, setArrOfTracks] = useState([]);

  useEffect(() => {
    setArrOfTracks(fetchedTracks);
    return setArrOfTracks([]);
  }, [fetchedTracks]);

  return (
    <div>
      {arrOfTracks.map((track) => {
        <Track key={track.id} track={track} />;
      })}
    </div>
  );
}

export default SearchResults;
