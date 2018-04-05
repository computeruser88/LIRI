require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var args = [];

function processTweets() {
    var params = { screen_name: 'NeoLiri' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("Tweets:");
            for (var i = 0; i < 20; i++) {
                console.log(`${tweets[i].created_at}: ${tweets[i].text}`);
                appendToFile(tweets[i].created_at + ": " + tweets[i].text + "\r\n");
            }
            appendToFile("---------------------------\r\n");
        }
    });
}
function processSpotifyRequest(arg) {
    if (arg) {
        spotify.search({ type: 'track', query: arg }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
                console.log(`Song Name: ${data.tracks.items[0].name}`);
                console.log(`Preview URL: ${data.tracks.items[0].preview_url}`);
                console.log(`Album: ${data.tracks.items[0].album.name}`);
                appendToFile("Artist: " + data.tracks.items[0].artists[0].name + "\r\n");
                appendToFile("Song Name: " + data.tracks.items[0].name + "\r\n");
                appendToFile("Preview URL: " + data.tracks.items[0].preview_url + "\r\n");
                appendToFile("Album: " + data.tracks.items[0].album.name + "\r\n");
                appendToFile("---------------------------\r\n");
            }
        });
    } else {
        spotify.search({ type: 'track', query: 'The Sign' }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                console.log(`Artist: ${data.tracks.items[5].artists[0].name}`);
                console.log(`Song Name: ${data.tracks.items[5].name}`);
                console.log(`Preview URL: ${data.tracks.items[5].preview_url}`);
                console.log(`Album: ${data.tracks.items[5].album.name}`);
                appendToFile("Artist: " + data.tracks.items[5].artists[0].name + "\r\n");
                appendToFile("Song Name: " + data.tracks.items[5].name + "\r\n");
                appendToFile("Preview URL: " + data.tracks.items[5].preview_url + "\r\n");
                appendToFile("Album: " + data.tracks.items[5].album.name + "\r\n");
                appendToFile("---------------------------\r\n");
            }
        });
    }
}

function processOMDBRequest(arg) {
    if (!arg) {
        arg = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=trilogy";
    request.get(queryUrl, function (error, response, body) {
        console.log(`Movie title: ${JSON.parse(body).Title}`);
        console.log(`Year: ${JSON.parse(body).Year}`);
        console.log(`IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`);
        console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);
        console.log(`Country where the movie was produced: ${JSON.parse(body).Country}`);
        console.log(`Language of the movie: ${JSON.parse(body).Language}`);
        console.log(`Plot synopsis: ${JSON.parse(body).Plot}`);
        console.log(`Actors: ${JSON.parse(body).Actors}`);
        appendToFile("Movie title: " + JSON.parse(body).Title + "\r\n");
        appendToFile("Year: " + JSON.parse(body).Year + "\r\n");
        appendToFile("IMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\r\n");
        appendToFile("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\r\n");
        appendToFile("Country where the movie was produced: " + JSON.parse(body).Country + "\r\n");
        appendToFile("Language of the movie: " + JSON.parse(body).Language + "\r\n");
        appendToFile("Plot synopsis: " + JSON.parse(body).Plot + "\r\n");
        appendToFile("Actors: " + JSON.parse(body).Actors + "\r\n");
        appendToFile("---------------------------\r\n");
    });
    //  Title of the movie.
    //  Year the movie came out.
    //  IMDB Rating of the movie.
    //  Rotten Tomatoes Rating of the movie.
    //  Country where the movie was produced.
    //  Language of the movie.
    //  Plot of the movie.
    //  Actors in the movie.
}
function appendToFile(message) {
    fs.appendFileSync('log.txt', message, function (err) {
        if (err) throw err;
    });
}

// log command
if (process.argv[2]) {
    fs.appendFileSync('log.txt', process.argv[2], function (err) {
        if (err) throw err;
    });
} else {
    console.log("Error: command not found");
}
if (process.argv[3]) {
    fs.appendFileSync('log.txt', " " + process.argv[3] + "\r\n", function (err) {
        if (err) throw err;
    })
} else {
    fs.appendFileSync('log.txt', "\r\n", function (err) {
        if (err) throw err;
    });
}

switch (process.argv[2]) {
    case "my-tweets":
        processTweets();
        break;
    case "spotify-this-song":
        processSpotifyRequest(process.argv[3]);
        break;
    case "movie-this":
        processOMDBRequest(process.argv[3]);
        break;
    case "do-what-it-says":
        fs.readFile("./random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }
            args = [];
            args = data.split(',');
            if (args[0]) {
                switch (args[0]) {
                    case "my-tweets":
                        processTweets();
                        break;
                    case "spotify-this-song":
                        processSpotifyRequest(args[1]);
                        break;
                    case "movie-this":
                        processOMDBRequest(args[1]);
                        break;
                }
            }
        });
        break;
}
