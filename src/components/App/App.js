import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";

// Create(hard code) an array of track objects to -->
// be passed down to Track component
const fetchedTracks = [
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
  // Create a state that can store and update the received data.
  const [fetchedTracksState, setFetchedTracksState] = useState(null);

  useEffect(() => {
    // use state setter along side of the JSON.parse()
    setFetchedTracksState(fetchedTracks);
  }, [fetchedTracksState]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Ja<span className="diff-color">mmm</span>ing
        </h1>
      </header>
      <main>
        <SearchBar />
        <section className="main-content">
          <SearchResults fetchedTracks={fetchedTracksState} />
          <Playlist />
        </section>
      </main>
    </div>
  );
}

export default App;

// ToDo:
// 2- So first I take care of SearchBar component
// 3- Then use useState() for the components, so I can update each data in response to user input and other *events*.
