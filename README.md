# LIRI Bot - Language Interpretation and Recognition Interface

LIRI Bot is a Node.js utility that can be used to query Twitter, OMDB, and Spotify APIs. It writes all searches and their results to a local log.txt file.

Use the following command line syntax to operate LIRI Bot:
* **node liri.js my-tweets** --> logs your last 20 tweets to the console
* **node liri.js spotify-this-song** <your song title goes here> --> logs artist, song name, preview URL, and album to the console. If no song is specified it will log "The Sign" by Ace of Base.
* **node liri.js movie-this** <your movie title goes here> --> logs movie information, including plot synopsis, IMDB and Rotten Tomatoes ratings to the console. If no movie is specified, it will log "Mr. Nobody" which I am told is a good film.
* **node liri.js do-what-it-says** --> looks for a file called *random.txt* and executes a single instruction in that file. Arguments in that file must be separated by a comma with no spaces in between.

*Technologies used in this project: Node.js, JavaScript, Ajax, Twitter API, OMDB API, Spotify API*

* LIRI Bot URL: https://computeruser88.github.io/LIRI/
* GitHub repository: https://github.com/computeruser88/LIRI

*Note: to use this repository you will need to supply your own Twitter and Spotify API keys. Mine were not uploaded to the repository for privacy and security reasons.*
