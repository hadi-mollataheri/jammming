import { useState, useEffect, useCallback } from "react";
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

  /*
    implement a method that adds a selected song from the search results track list to the user’s custom playlist. 
    The method should be triggered when the user clicks an “add” button displayed 
    next to each track in the search results list. I used useCallback hook so if the 
    playlistTracks didn't changed the addSong function won't be created again 
    and don't cause the SearchResult to re-render. This function is supposed to be an event handler
    so I send it to SearchResults with the onAdd prop name.  

    You will want to create a method that can accept a track as an argument,
    and check if the passed-in track is in the playlist already — 
    there is a unique property of each track that can help you with
    this step, and if the song is new, add the song to the playlist.
    The “add” button can be anything. For example, a + sign provides a visual aid
    of “adding” a song. An event listener can wait for the button to be clicked and
      trigger the method that adds the track to the playlist.
  */
  const addTrack = useCallback(
    (track) => {
      if (
        !playlistTracks.some((selectedTrack) => selectedTrack.id === track.id)
      ) {
        setPlaylistTracks((prevTracks) => [track, ...prevTracks]);
      }
    },
    [playlistTracks]
  );

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

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
          <SearchResults fetchedTracks={fetchedTracksState} onAdd={addTrack} />

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
