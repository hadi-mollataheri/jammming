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
  // Logic for adding track from SearchResults to Playlist
  const addTrack = useCallback(
    (track) => {
      if (
        !playlistTracks.some((selectedTrack) => selectedTrack.id === track.id)
      ) {
        setPlaylistTracks((prevTracks) => [...prevTracks, track]);
      }
    },
    [playlistTracks]
  );
  // Login for removing track from Playlist
  const removeTrack = useCallback(
    (track) => {
      if (
        playlistTracks.some((selectedTrack) => selectedTrack.id === track.id)
      ) {
        setPlaylistTracks((prevTracks) => {
          return prevTracks.filter(
            (remainingTrack) => remainingTrack.id !== track.id
          );
        });
      }
    },
    [playlistTracks]
  );
  // Save user playlist name
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
          <SearchResults
            fetchedTracks={fetchedTracksState}
            onAdd={addTrack}
            isRemovable={false}
          />

          <Playlist
            playlistName={playlistName}
            onNameChange={updatePlaylistName}
            playlistTracks={playlistTracks}
            isRemovable={true}
            onRemove={removeTrack}
          />
        </section>
      </main>
    </div>
  );
}

export default App;


/*
  Explanation for AddTrack:
  implement a function that adds a selected song from the search results track list to the user’s custom playlist. 
  The method should be triggered when the user clicks an “add” button displayed 
  next to each track in the search results list. I used useCallback hook so if the 
  playlistTracks didn't changed the addSong function won't be created again 
  and don't cause the SearchResult to re-render. This function is supposed to be an event handler
  so I send it to SearchResults with the onAdd prop name. 
  '+' buttons should be connected to each Track so they should be made inside Track component.

  Explanation for removeTrack:
  create a function that can accept a track as an argument, and check if the passed-in 
  track is in the playlist — there is a unique property of each track that can help you with this step, 
  and if the song exists in the playlist, remove it.
  The “remove” button can be anything. For example, a - sign provides a 
  visual aid of “subtracting” or “removing” a song. An event listener can 
  wait for the button to be clicked and trigger the method that removes the track from the playlist.
  Don’t forget to render the playlist component with the updated 
  playlist to reflect the changes made by removing the track! playlistTracks.some will help that 
  the components won't render every time. [playlistTracks] should be present because otherwise playlistTracks would set to [] after first render.
  */
