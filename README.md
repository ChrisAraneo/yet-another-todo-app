## Install the latest Angular CLI

`npm i -g @angular/cli`

## Install Electron

`npm i -D electron`

## Run the server
Application uses simple server that writes and reads JSON file containing created tasks.
Starting a server is a first thing you should do before running the web app / desktop app.
To run the server you have to run `server.js` and specify the file location.

`node server.js /here/is/path/to/store.json`

For example (Windows):

`node server.js C:\Users\chris\Desktop\store.json`

Server runs on port 9339.

## Run the application

`npm run start`
`npm run electron-start`

## Building the distributable web app & desktop app

`npm run build`

The distributables will be built into `dist` folder.