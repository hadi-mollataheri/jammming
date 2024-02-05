import React from "react";

function Track(props) {
  const addTrackHandler = (e) => {
    props.onAdd(props.track);
  };
  const removeTrackHandler = (e) => {
    props.onRemove(props.track);
  };
  const renderActions = () => {
    return (
      <div>
        <button onClick={addTrackHandler}>+</button>
        <button onClick={removeTrackHandler}>-</button>
      </div>
    );
  };
  return (
    <div className="track">
      <div className="track-info">
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {renderActions()}
    </div>
  );
}
export default Track;
