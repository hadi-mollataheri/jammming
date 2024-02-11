const clientId = require("./c-id");
/*
Create a JavaScript module that will handle the logic for getting an access 
token and using it to make requests. The method should have a way to get a 
user’s access token and store it.
*/

// *** Eventually I should wrap all the below function inside a single function I think for now.***
// *** When user click on Search button above functions should be run
// *** So we can have a token

// First step create a url that open a page and ask user to give permission and then
function redirectToAuthorizationServer() {
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
}
redirectToAuthorizationServer();

// Now I should extract the values of access_token key and expires_in key
// Create a function called extractToken that accept a url as an argument
function extractTokenFromUrl() {
  // I should access to the new url
  let finalUrl = window.location.href;
  // Turn the string url to object url
  let objectUrl = new URL(finalUrl);
  if (objectUrl.hash === "") {
    alert("Please log into your account and grant access!");
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
  return keyValueObj;
}

/*
From the URL, you should extract the access token values and set them up in your app. 
You should also set up a variable for the expiration time and configure the access token to expire at the appropriate time.
*/
let { access_token, expires_in } = extractTokenFromUrl();

// Save the expires_in in browser local storage to avoid refreshing the timer
localStorage.setItem("expires_in", expires_in.toString());
let savedExpires_in = Number(localStorage.getItem("expires_in"));

const handleExpireToken = () => {
  redirectToAuthorizationServer();
  let { access_token, expires_in } = extractTokenFromUrl();
  localStorage.setItem("expires_in", expires_in.toString());
  let savedExpires_in = Number(localStorage.getItem("expires_in"));
  // setTimeout should be here incase of that the savedExpires_in still be undefined if user hasn't logged in.
  setTimeout(handleExpireToken, savedExpires_in * 1000);
};
handleExpireToken();

/*
Connect the search bar to Spotify so that it can query data from
the Spotify API. Your implementation should enable users to enter
a search parameter and receive a response from the Spotify API.
You should display the results from the request to the user.
To make your request to the API, 
use the /v1/search?type=TRACK endpoint. You can refer to 
the Spotify Web API Endpoint Reference for guidance on formatting 
your request.
*/
async function searchRequest() {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/search?type=TRACK",
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
