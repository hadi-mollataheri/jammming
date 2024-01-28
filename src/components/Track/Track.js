import React from "react";

function Track(track) {
  return (
    <div>
      <p>{track.name}</p>
      <ul>
        <li>{track.artist}</li>
        <li>{track.album}</li>
      </ul>
    </div>
  );
}

export default Track;
