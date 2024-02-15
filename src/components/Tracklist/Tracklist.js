import React from "react";
import Track from "../Track/Track.js";

function Tracklist(props) {
  // console.log(props.tracks);
  return (
    <div className="tracklist">
      {props.tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            onAdd={props.onAdd}
            test='test'
            isRemovable={props.isRemovable}
            onRemove={props.onRemove}
          />
        );
      })}
    </div>
  );
}

export default Tracklist;
