// *** When user click on Search button above functions should be run
// *** So we can have a token

import { clientId } from "./c-id";
let access_token;

function getAccessToken() {
  // If we a have a access_token(this we make sure that the getAccessToken won't run again)
  if (access_token) {
    // Return access_token
    return access_token;
  }

  const client_id = clientId;
  const response_type = "token";
  const redirect_uri = "http://localhost:3000";
  const state = "20";
  const scope = "playlist-modify-public";

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
    // Save the expires_in in browser local storage to avoid refreshing the timer
    localStorage.setItem("expires_in", expires_in.toString());
    let savedExpires_in = Number(localStorage.getItem("expires_in"));

    window.setTimeout(() => (access_token = ""), savedExpires_in * 1000);
    window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to grab a new access token when it expires.

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
