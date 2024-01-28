import { useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResult from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
// import Tracklist from "../Tracklist/Tracklist.js";
import Track from "../Track/Track.js";

// Create(hard code) an array of track objects to -->
// be passed down to Track component
const tracklist = [
  {
    name: "Under Ground Kings",
    artist: "Drake",
    album: "Take Care",
    id: 1,
  },
  {
    name: "Lily",
    artist: "Alan Walker, K-391, Emelie Hollow",
    album: "Different World",
    id: 2,
  },
  {
    name: "Heart of Gold",
    artist: "Ryan Stewart",
    album: "Celtic Spell",
    id: 3,
  },
];

function App() {
  // Use state to store search results array, allowing you to update the array in response to user inputs
  const [track, setTrack] = useState([
    {
      name: "",
      artist: "",
      album: "",
      id: null,
    },
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Ja<span className="diff-color">mmm</span>ing
        </h1>
      </header>
      <main>
        <SearchBar />
        <section className="result-playlist">
          <SearchResult tracks={track} />
          <Playlist />
        </section>
      </main>
    </div>
  );
}

export default App;
