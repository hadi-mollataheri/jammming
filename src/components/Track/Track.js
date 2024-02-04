// This component is used in SearchResult component.

import React from "react";

function Track(props) {
  // onAdd is a function that needs to be called with a track
  const addTrackHandler = ({ target }) => {
    props.onAdd(props.track);
  };

  // For readability I create the <button>s inside a function and I'll -
  // render that function inside the render section(return statement)
  const renderActions = () => {
    return <button onClick={addTrackHandler}>+</button>;
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
