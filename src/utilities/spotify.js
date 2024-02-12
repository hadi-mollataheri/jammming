// *** When user click on Search button above functions should be run
// *** So we can have a token

const clientId = require("./c-id");
let access_token = '';
function getAccessToken() {
  // If we a have a access_token(this we make sure that the getAccessToken won't run again)
  if (access_token) {
    // Return access_token
    return access_token;
  }

  // Otherwise
  // First step create a url that open a page and ask user to give permission and then

  const client_id = clientId;
  const response_type = "token";
  const redirect_uri = "http://localhost:3000";
  const state = "20";
  const scope = "playlist-modify-public";
  const url = `https://accounts.spotify.com/authorize?response_type=${response_type}&client_id=${encodeURIComponent(
    client_id
  )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&state=${encodeURIComponent(state)}`;
  // After user granted permission the code below direct the user to redirect_uri + hash fragment
  // (or hash property: the part of url that comes after # and it leads us specific section within a website)
  window.location.href = url;

  // Extract the values of access_token key and expires_in key
  // Access to the new url
  let finalUrl = window.location.href;
  // Turn the string url to object url
  let objectUrl = new URL(finalUrl);
  if (objectUrl.hash === "") {
    alert("Please log into your account and grant access!");
    return;
  }
  // Extract the hash property(it's value still is string) of objectUrl
  let hash = objectUrl.hash;
  // Remove the leading # from the hash
  let pureHash = hash.substring(1);
  // split it by '&' to get an array of key-value pairs
  let keyValuePairsArray = pureHash.split("&");
  // Create an object for storing each key with it's respective value
  let keyValueObj = {};
  // Loop through the array and split each pair by '=' to get the key and value separately
  keyValuePairsArray.forEach((keyValuePair) => {
    // Use destructuring array to store each key and value from the array result of split
    let [key, value] = keyValuePair.split("=");
    keyValueObj[key] = value;
  });

  let { access_token, expires_in } = keyValueObj;
  if (access_token === undefined) {
    alert("Please log into your account and grant access!");
    return;
  }
  // Save the expires_in in browser local storage to avoid refreshing the timer
  localStorage.setItem("expires_in", expires_in.toString());
  let savedExpires_in = Number(localStorage.getItem("expires_in"));

  window.setTimeout(() => (access_token = ""), savedExpires_in * 1000);
  window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to grab a new access token when it expires.
  return access_token;
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
      const data = await response.json();
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
}
