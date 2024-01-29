import React from "react";
import Track from "../Track/Track.js";

function Tracklist({ tracks }) {
  return tracks.map((track) => <Track key={track.id} track={track} />);
}

export default Tracklist;
