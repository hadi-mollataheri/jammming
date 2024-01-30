// This component is used in SearchResult component.

import React from "react";

function Track({ track }) {

  return (
    <div id={track.id}>
      <p>{track.name}</p>
      <ul>
        <li>{track.artist}</li>
        <li>{track.album}</li>
      </ul>
      <hr />
    </div>
  );
}

export default Track;
