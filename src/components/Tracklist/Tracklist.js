import React from "react";
import Track from "../Track/Track.js";

function Tracklist(props) {
  return (
    <div className="tracklist">
      {props.tracks.map((track) => {
        return <Track track={track} key={track.id} onAdd={props.onAdd} />;
      })}
    </div>
  );
}

export default Tracklist;
