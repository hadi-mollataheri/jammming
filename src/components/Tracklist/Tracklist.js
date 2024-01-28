import React from "react";
import Track from "../Track/Track.js";

function Tracklist({ tracklist }) {
  return SearchResults.map((track) => <Track key={track.id} track={track} />);
}
