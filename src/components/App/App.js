import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResult from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import Tracklist from "../Tracklist/Tracklist.js";
import Track from "../Track/Track.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Ja<span className="diff-color">mmm</span>ing
        </h1>
      </header>
      <main>
        <SearchBar />
        <SearchResult />
        {/* <Playlist /> */}
      </main>
    </div>
  );
}

export default App;
