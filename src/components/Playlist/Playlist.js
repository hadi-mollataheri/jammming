import React, { useCallback } from "react";

import Tracklist from "../Tracklist/Tracklist.js";
import styles from './Playlist.module.css'
function Playlist(props) {
  const handleNameChange = useCallback(
    (event) => {
      props.onNameChange(event.target.value);
    },
    [props.onNameChange]
  );

  const handleClick = useCallback(
    (event) => {
      props.onSaveToSpotify(props.playlistName, props.playlistTracks);
    },
    [props.onSaveToSpotify, props.playlistName, props.playlistTracks]
  );

  return (
    <div className={styles.playlist}>
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
      <button className={styles.saveButton} onClick={handleClick}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;

/*
  Explanation for input:
    There is no need that I make the input controllable(setting value={props.playlistName}) 
*/
