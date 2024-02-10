import { clientId } from "./c-id";
/*
Create a JavaScript module that will handle the logic for getting an access 
token and using it to make requests. The method should have a way to get a 
user’s access token and store it.
*/
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
  console.log(keyValueObj);
  // return keyValueObj;
}
extractTokenFromUrl();
