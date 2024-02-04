import React from "react";
import Tracklist from "../Tracklist/Tracklist.js";

function Playlist(props) {

  const handleNameChange = ({ target }) => {
    props.onNameChange(target.value);
  };

  return (
    <div
      className="playlist"
      style={{ backgroundColor: "#6059E1", width: 300, height: 400 }}
    >
      <form>
        <label htmlFor="playListName" style={{ fontWeight: "bold" }}>
          Playlist
        </label>
        <br />
        <input
          id="playListName"
          type="text"
          onChange={handleNameChange}
          value={props.playlistName}
        />
        <hr />
        <Tracklist
          tracks={props.playlistTracks}
        />
        <button type="submit">SAVE TO SPOTIFY</button>
      </form>
    </div>
  );
}

export default Playlist;
