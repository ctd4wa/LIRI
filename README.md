# LIRI-Bot

## What is this project?
Liri is a program that functions like Siri using several different node packaging managers.

## How does it work? 
Through the Command-Line Interface, a user will be able to use 4 different commands and will receive information in return.

- The "concert-this" command will take in the name of the artist and will return their next concert's venue, date and time. By using the following command, for example, a user would be able to find out OneRepublic's next concert date.

```bash
node liri.js concert-this Muse
```
![Concert-This](https://github.com/ctd4wa/LIRI/blob/master/images/concert-this.JPG?raw=true)

- "spotify-this-song" acts as a command that takes any song name and returns the artist, album and a preview link for the user to see.

```bash
node liri.js spotify-this-song Take On Me
```
![spotify-this-song](https://github.com/ctd4wa/LIRI/blob/master/images/spotify-this-song.JPG?raw=true)

- The "movie-this" command takes in a movie from the command line and will make the Axios call to return the Release Year, IMDB Rating, country where the movie was produced, the language of the movie, the plot of the movie and its actors.

```bash
node liri.js movie-this Rush Hour
```
![movie-this](https://github.com/ctd4wa/LIRI/blob/master/images/movie-this.JPG?raw=true)

- And finally, the "do-what-it-says" command utilizes the 'fs.readFile' method in order to read the the text from a .txt and submit that command in order to do whatever it says on the file. This command does not require an additional argument. In this example, it is to search Spotify for the song "I Want It That Way".

```bash
node liri.js do-what-it-says
```
![do-what-it-says](https://github.com/ctd4wa/LIRI/blob/master/images/do-what-it-says.JPG?raw=true)

## Technologies Used
 - Spotify API
 - Bands In Town API
 - OMDB API
 - Node.js
 - Javascript
 - NPM Packages
