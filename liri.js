
// Define dependent variables so they're global
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
// to read from random.txt
var fs = require("fs");

var nodeArgs = process.argv;
var query = "";


var option = process.argv[2];


for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        query = query + "+" + nodeArgs[i];
    } else {
        query += nodeArgs[i];
    }
}

// Initialize Spotify client
var spotify = new Spotify(keys.spotify);


switch (option) {
    case "movie-this":
        movieThis(query);
        break;
    case "spotify-this-song":
        spotifyCall(query);
        break;
    case "concert-this":
        concertThis(query);
        break;
    case "do-what-it-says":
        doCommand();
        break;

}

// SPOTIFY-THIS-SONG
function spotifyCall(songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\n_Track Info_" + 
        "\nArtist: " + data.tracks.items[0].artists[0].name + 
        "\nSong: " + data.tracks.items[0].name + 
        "\nLink: " + data.tracks.items[0].preview_url + 
        "\nAlbum: " + data.tracks.items[0].album.name);
    });
}

// MOVIE-THIS
function movieThis(movieName) {
    if (!movieName) {
        movieName = "Mr. Nobody";
    }
    // create queryURL variable 
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl).then(
        function (response) {
            if (!movieName) {
                movieName = "Mr. Nobody";
            }
            console.log(
                "\n_Movie Info_" + 
                "\nTitle: " + response.data.Title + 
                "\nRelease Year: " + response.data.Year + 
                "\nRating: " + response.data.Rated + 
                "\nIMDBRating: " + response.data.imdbRating +
                "\nRelease Country: " + response.data.Country + 
                "\nLanguage: " + response.data.Language + 
                "\nPlot: " + response.data.Plot + 
                "\nActors: " + response.data.Actors );
        }
    );
}


// CONCERT-THIS

function concertThis(artist) {
    // QueryURL to add command input into URL
    var bandsQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(bandsQueryUrl).then(
        function (response) {
            console.log("Coming Soon..");
            console.log("Artist: " + artist + 
            "\nVenue: " + response.data[0].venue.name + 
            "\nLocation: " + response.data[0].venue.country + 
            "\nDate: " + moment(response.data[0].datatime).format('MM/DD/YYYY'));
        });
}

function doCommand() {
    fs.readFile("random.txt", "UTF8", function(error,data) {

        if (error) {
            console.log(error);
        } 
        console.log(data);

        var dataArr = data.split(",");
        var command = dataArr[0];
        var choice = dataArr[1];

        if (command === "spotify-this-song") {
            query = choice;
            spotifyCall(query);
        } else if (command === "movie-this") {
            query = choice;
            movieThis(query);
        } else if (command === "concert-this") {
            query = choice;
            concertThis(query);
        }
    });
};