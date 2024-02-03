// This component is used in SearchResult component.

import React from "react";

function Track({ track }) {
  return (
    <div className="track">
      <h3>{track.name}</h3>
      <p>
        {track.artist} | {track.album}
      </p>
    </div>
  );
}

export default Track;
