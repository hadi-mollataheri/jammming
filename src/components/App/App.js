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
  const [fetchedTracksState, setFetchedTracksState] = useState([]);
  // Create a state for initializing the playlist name
  const [playlistName, setPlaylistName] = useState("New Playlist");
  // Create a state for initializing the playlist tracks
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    setFetchedTracksState(fetchedTracks);
  }, []);

  useEffect(() => {
    setPlaylistTracks(fetchedTracks);
  }, []);

  // Create method that accept an argument Track from the SearchResults and if it's not in the Playlist already then add it
  // This method will be an event handler for the '+' button next to the each Track in SearchResult
  // const handleAddSong = ({ target }) => {
  //   if (!playlistTracks.includes(target.track)) {
  //     setPlaylistTracks((prev) => {
  //       return [target.track, ...prev];
  //     });
  //   }
  // };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  }

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
          <Playlist
            playlistName={playlistName}
            onNameChange={updatePlaylistName}
            playlistTracks={playlistTracks}
            updatePlaylistTracks={setPlaylistTracks}
          />
        </section>
      </main>
    </div>
  );
}

export default App;

// ToDo:
// 2- So first I take care of SearchBar component
// 3- Then use useState() for the components, so I can update each data in response to user input and other *events*.
