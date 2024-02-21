// *** When user click on Search button above functions should be run
// *** So we can have a token

import { clientId } from "./c-id";
let access_token;

const client_id = clientId;
const response_type = "token";
const redirect_uri = "http://localhost:3000";
const state = "20";
const scope = "playlist-modify-public user-read-private user-read-email";

function getAccessToken() {
  // If we a have a access_token(this we make sure that the getAccessToken won't run again)
  // Explanation: if there’s a chance that the access_token could be set elsewhere in your code (outside of the getAccessToken() function), then this check could be useful to keep.
  if (access_token) {
    // Return access_token
    return access_token;
  }

  // Check if access_token is stored in local storage(this is necessary
  // because otherwise the next function wont access the access_token
  // because the pushState method in this function will remove it)
  const localStorageToken = localStorage.getItem("access_token");
  if (localStorageToken) {
    access_token = localStorageToken;
    return access_token;
  }
  // Extract the values of access_token key and expires_in key
  // Access to the new url
  let currentUrl = window.location.href;
  // Extract access_token and expires_in parameters from the currentUrl using regular expression
  const accessTokenMatch = currentUrl.match(/access_token=([^&]*)/); // output: ['access_token=', '...']
  const expiresInMatch = currentUrl.match(/expires_in=[^&]*/);
  if (accessTokenMatch && expiresInMatch) {
    // Update access_token global variable
    access_token = accessTokenMatch[1];
    const expires_in = Number(expiresInMatch[1]);
    // Save the expires_in and access_token in browser local storage to avoid refreshing the timer
    localStorage.setItem("expires_in", expires_in.toString());
    localStorage.setItem("access_token", access_token);
    let savedExpires_in = Number(localStorage.getItem("expires_in"));

    window.setTimeout(() => (access_token = ""), savedExpires_in * 1000);
    // clear the URL parameters after extracting the access token.
    //  This is done to prevent the access token from being visible in
    // the URL after it’s been obtained. and This clears the
    //  parameters, allowing us to grab a new access token when it expires.
    window.history.pushState("Access Token", null, "/");

    return access_token;
  } else {
    const url = `https://accounts.spotify.com/authorize?response_type=${response_type}&client_id=${encodeURIComponent(
      client_id
    )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&state=${encodeURIComponent(state)}`;
    window.location.assign(url);
  }
}

export async function searchRequest(userSearchInput) {
  try {
    const access_token = getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${userSearchInput}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      if (!jsonResponse.tracks) {
        return [];
      }
      // items is an array of tracks, we should make an object with relative properties for each track
      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } else {
      // Throw an error if the response is not ok
      throw new Error(`Request failed: ${response.status}`);
    }
  } catch (e) {
    console.log(e);
    return [];
  }
}

// This function needs to run when user hit the 'SAVE TO SPOTIFY' button
// And save his playlist with their desire name and tracks
export const saveToSpotify = (playlistName, playlistTracks) => {
  // Make a request to the spotify to post playlist to user account

  // For this, get the user's ID by making a GET request to this "https://api.spotify.com/v1/me" endpoint
  // above request should return a promise that resolve to a user ID(returns a user ID)
  // Get the access token from getAccessToken()
  const access_token = getAccessToken();
  // getUserId returns a promise that resolves to a user id if every thing goes ok.
  const getUserId = async () => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    // Turn json string response to json
    const jsonResponse = await response.json();

    if (jsonResponse) {
      // Return user ID
      return jsonResponse.id;
    } else {
      throw new Error(`Request failed: ${response.status}`);
    }
  };

  // Create a POST request to "https://api.spotify.com/v1/users/{user_id}/playlists" endpoint
  // in the body of the above POST request, set name and description of new the new playlist.
  // This post request is for creating a new playlist with a new name and return a promise that resolve to a new playlist ID
  const createPlaylist = async () => {
    const userId = await getUserId();
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlistName,
          description: `The ${playlistName} is created by Jammming web app`,
        }),
      }
    );
    const jsonResponse = await response.json();

    if (jsonResponse) {
      // Return playlist ID
      return jsonResponse.id;
    } else {
      throw new Error(`Request failed: ${response.status}`);
    }
  };

  const postToSpotify = async () => {
    const userId = await getUserId();
    const playlistId = await createPlaylist();
    // Add playlist tracks to new playlist by making a POST request to the
    // "https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks" endpoint
    // in body of the above POST request, set list of track IDs to add them to the new playlist
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: playlistTracks.map((track) => track.uri),
        }),
      }
    );
    const jsonResponse = await response.json();
    // If jsonResponse is truthy
    if (jsonResponse) {
      // Then reset the playlistTracks
      playlistTracks = [];
    } else {
      throw new Error(`Request failed: ${response.status}`);
    }
  };
  return postToSpotify();
};

/*
The reason for order of creating a url and extracting access token:

  One possible reason why this code will work fine is that you have 
  changed the order of the logic in the getAccessToken function. 
  In the previous code, you were trying to create the url and redirect the 
  user before checking if the objectUrl.hash was empty or not. This could 
  cause problems if the user had already granted permission and had 
  a valid access token in the hash. In that case, you would be 
  redirecting them again and losing the access token.
In this code, you have moved the url creation and redirection to 
the else block, which only runs if the access_token and expires_in are not defined. 
This way, you are checking the hash first and extracting the access token if it 
exists, before trying to redirect the user.
*/
