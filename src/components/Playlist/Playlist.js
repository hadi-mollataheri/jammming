import React from "react";
import Tracklist from "../Tracklist/Tracklist.js";

function Playlist(props) {
  const handleChange = ({ target }) => {
    props.updatePlaylistName(target.value);
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
          onChange={handleChange}
          value={props.playlistName}
        />
        <hr />
        <button type="submit">SAVE TO SPOTIFY</button>
      </form>
      <Tracklist
        tracks={props.playlistTracks}
        updateTracks={props.updatePlaylistTracks}
      />
    </div>
  );
}

export default Playlist;
