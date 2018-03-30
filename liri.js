require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var omdbApi = require('omdb-client');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

switch (process.argv[2]) {
    case "my-tweets":
        var params = { screen_name: 'NeoLiri' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log("Tweets:");
                for (var i = 0; i < 20; i++) {
                    console.log(tweets[i].created_at + ": " + tweets[i].text);
                }
            }
        });
        break;
    case "spotify-this-song":
        if (process.argv[3]) {
            spotify.search({ type: 'track', query: process.argv[3] }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                } else {
                    console.log("Artist: " + data.tracks.items[0].artists[0].name);
                    console.log("Song Name: " + data.tracks.items[0].name);
                    console.log("Preview URL: " + data.tracks.items[0].preview_url);
                    console.log("Album: " + data.tracks.items[0].album.name);
                }
            });
        } else {
            spotify.search({ type: 'track', query: 'The Sign' }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                } else {
                    console.log("Artist: " + data.tracks.items[5].artists[0].name);
                    console.log("Song Name: " + data.tracks.items[5].name);
                    console.log("Preview URL: " + data.tracks.items[5].preview_url);
                    console.log("Album: " + data.tracks.items[5].album.name);
                }
            });
        }
        break;
    case "movie-this":
    var params = {
        apiKey: '8662e0bd',
        title: process.argv[3]
    }
    omdbApi.get(params, function(err, data) {
        console.log("Movie title: " + data.Title);
        console.log("Year: " +  data.Year);
        console.log("IMDB Rating: " + data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
        console.log("Country where the movie was produced: " + data.Country);
        console.log("Language of the movie: " + data.Language);
        console.log("Plot synopsis: " + data.Plot);
        console.log("Actors: " + data.Actors);
    });
        //  Title of the movie.
        //  Year the movie came out.
        //  IMDB Rating of the movie.
        //  Rotten Tomatoes Rating of the movie.
        //  Country where the movie was produced.
        //  Language of the movie.
        //  Plot of the movie.
        //  Actors in the movie.
        break;
    case "do-what-it-says":
        break;
}
