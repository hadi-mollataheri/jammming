import React from "react";

function Playlist() {
  return (
    <div
      className="playlist"
      style={{ backgroundColor: "#6059E1", width: 300, height: 400 }}
    >
      <form>
        <label htmlFor="playListName" style={{fontWeight: 'bold'}}>Enter your playlist name:</label>
        <input id="playListName" type="text" />
        <hr />
        <button type="submit">SAVE TO SPOTIFY</button>
      </form>
    </div>
  );
}

export default Playlist;
