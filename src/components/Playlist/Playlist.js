import React, { useCallback } from "react";

import Tracklist from "../Tracklist/Tracklist.js";

function Playlist(props) {
  const handleNameChange = useCallback(
    (event) => {
      props.onNameChange(event.target.value);
    },
    [props.onNameChange]
  );

  return (
    <div className="playlist">
      <label htmlFor="playListName" style={{ fontWeight: "bold" }}>
        Playlist
      </label>
      <br />
      <input
        id="playListName"
        type="text"
        onChange={handleNameChange}
        placeholder={props.playlistName}
      />
      <hr />
      <Tracklist
        tracks={props.playlistTracks}
        isRemovable={props.isRemovable}
        onRemove={props.onRemove}
      />
      <button>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;

/*
  Explanation for input:
    There is no need that I make the input controllable(setting value={props.playlistName}) 
*/
