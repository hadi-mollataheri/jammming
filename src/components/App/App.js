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
          Ja<span ClassName="diff-color">mmm</span>ing
        </h1>
        {/* <SearchBar />
        <SearchResult />
        <Playlist>
          <Traclist>
            <Track />
          </Traclist>
        </Playlist> */}
      </header>
    </div>
  );
}

export default App;
