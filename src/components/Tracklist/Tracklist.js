import React from "react";
import Track from "../Track/Track.js";
import styles from './Tracklist.module.css'

function Tracklist(props) {
  return (
    <div className={styles.tracklist}>
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
