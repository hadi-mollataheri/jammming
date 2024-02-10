import React from "react";
import Tracklist from "../Tracklist/Tracklist.js";

function Playlist(props) {
  const handleNameChange = ({ target }) => {
    props.onNameChange(target.value);
  };

  return (
    <div className="playlist">
      <form>
        <label htmlFor="playListName" style={{ fontWeight: "bold" }}>
          Playlist
        </label>
        <br />
        <input
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
        <button type="submit">SAVE TO SPOTIFY</button>
      </form>
    </div>
  );
}

export default Playlist;

/*
  Explanation for input:
    There is no need that I make the input controllable(setting value={props.playlistName}) 
*/
