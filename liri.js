require("dotenv").config();
var keys = require("./keys.js");
// Terminal Colors

// Calls to BandsInTown and OMDB
var request = require('request');
// Date Formatting
var moment = require('moment');
// Spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var fs = require('fs');

var command = process.argv[2];
var media_array = process.argv.slice(3);
var media = media_array.join(" ");

function doThings(command, media) {
    switch (command) {

        case 'spotify-this-song':
            spotifyThis(media); break;
        case 'movie-this':
            movieThis(media); break;
        case 'concert-this':
            concertThis(media); break;
        case 'do-what-it-says':
            doWhatItSays(); break;
        default:
            console.log("Invalid command. Please type any of the following commands:");
            console.log("concert-this", "spotify-this-song", "movie-this", "do-what-it-says");
    }
}

function spotifyThis(media) {
    // Default value
    if (media == "") {
        media = "All Star"
    }

    // Search spotify API
    spotify
        .search({ type: 'track', query: media, limit: 1 })
        .then(function (response) {
            var song = response.tracks.items[0];
            if (song != undefined) {
                console.log("Song Name: " + song.name);

                console.log("Artist: ");
                for (i = 0; i < song.artists.length; i++) {
                    console.log(song.artists[i].name);
                }

                console.log("Spotify URL: " + song.preview_url);

                console.log("Album: " + song.album.name);
            } else {
                console.log("Can't find this song!")
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function concertThis(media) {
    // Default value
    if (media == "") {
        media = "Brockhampton"
    }
    request("https://rest.bandsintown.com/artists/" + media + "/events?app_id=codingbootcamp", function (error, response, data) {
        try {
            var response = JSON.parse(data)
            if (response.length != 0) {
                console.log("Upcoming concerts for " + media)
                response.forEach(function (element) {
                    console.log("Venue name: " + element.venue.name);
                    if (element.venue.country == "United States") {
                        console.log("City: " + element.venue.city + ", " + element.venue.region);
                    } else {
                        console.log("City: " + element.venue.city + ", " + element.venue.country);
                    }
                    console.log("Date: " + moment(element.datetime).format('MM/DD/YYYY'));
                    console.log();
                })
            } else {
                console.log("No concerts found.");
            }
        }
        catch (error) {
            console.log("No concerts found.");
        }
    });
}

function movieThis(media) {
    // Default value
    if (media == "") {
        media = "Mr. Nobody"
    }
    request("http://www.omdbapi.com/?apikey=trilogy&t=" + media, function (error, response, data) {
        try {
            var response = JSON.parse(data)
            if (response.Title != undefined) {
                console.log("Movie: " + response.Title);
                console.log("Year: " + response.Year);
                console.log("IMDB Rating: " + response.imdbRating);
                console.log("Rotten Tomatoes: " + response.Ratings[2])
                console.log("Country: " + response.Country);
                console.log("Language: " + response.Language);
                console.log("Plot: " + response.Plot);
                console.log("Actors: " + response.Actors);
                console.log();
            } else {
                console.log(chalk.red("This movie not found."));
            }
        }
        catch (error) {
            console.log(chalk.red("This movie not found."));
        }
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, response) {
        if (err) {
            console.log(err);
        }
        let params = (response.split(','));
        doThings(params[0], params[1]);
    })
}

doThings(command, media);