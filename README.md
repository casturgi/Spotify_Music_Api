This app was created with create-react-app. I suggest reading their documentation for more information about using this repo. 

After cloning this repo, run npm install. 

For this application to function properly, you'll need to get a spotify token and replace the authorization header in the app.js file on line 24. Make sure that the token you get from authenticating with spotify is preceeded by the string "Bearer " in the same way that it is when you first clone the repo. The token you see when you clone this repo is expired so replacing it is necessary in order for the application to function. 

To get the spotify auth token, follow the instructions detailed in this link http://www.angular-city.com/2017/07/spotify-web-api-access.html.
