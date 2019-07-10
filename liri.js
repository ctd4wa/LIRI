require("dotenv").config();

// Setting up keys and variables

var keys = require("./keys.js");

var userInput = process.argv[2];
var userChoice = process.argv.slice(3).join("");

var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var request = require("request");
var fs = require("fs");

// Make sure that liri.js can take in one of each of the commands

switch (userInput) {
    case "concert-this":
        showConcerts();
        break;

    case "spotify-this-song":
        spotifySong(userChoice);
        break;

    case "movie-this":
        movieThis(userChoice);
        break;

    case "do-what-it-says":
        doThis();
        break;
};