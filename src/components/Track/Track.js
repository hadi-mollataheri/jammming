import React, { useCallback } from "react";
import styles from './Track.module.css';

function Track(props) {
  // onAdd is a function that needs to be called with a track
  const addTrackHandler = useCallback(
    (e) => {
      props.onAdd(props.track);
    },
    [props.onAdd, props.track]
  );

  const removeTrackHandler = useCallback(
    (event) => {
      props.onRemove(props.track);
    },
    [props.onRemove, props.track]
  );
  // For readability I create the <button>s inside a function and I'll -
  // render that function inside the render section(return statement)
  // props.isRemovable is a new prop that you should pass to the Track component.
  // This prop should be true for tracks in the playlist and false for tracks in the search results.
  const renderActions = () => {
    if (props.isRemovable) {
      return (
      <button className={styles.button} onClick={removeTrackHandler}>
        -
      </button>
      );
    }
    return <button className={styles.button} onClick={addTrackHandler}>+</button>;
  };

  return (
    <div className={styles.track}>
      <div className={styles.trackInfo}>
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {renderActions()}
      <hr />
    </div>
  );
}

export default Track;
