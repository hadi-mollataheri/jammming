import React from "react";

function Track({track}) {
  // Use state to store search results array, allowing you to update the array in response to user inputs
  // const [track, setTrack] = useState([
  //   {
  //     name: "",
  //     artist: "",
  //     album: "",
  //     id: null,
  //   },
  // ]);

  return (
    <div id={track.id}>
      <p>{track.name}</p>
      <ul>
        <li>{track.artist}</li>
        <li>{track.album}</li>
      </ul>
      <hr />
    </div>
  );
}

export default Track;
