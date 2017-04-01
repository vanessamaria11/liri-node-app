var fs = require("fs");
var OMDB = require("request");
var spotify = require("spotify");
var Twitter = require("twitter");

var userRequest = process.argv[2];
var searchTitle = process.argv[3];
//Bonus
fs.appendFile('log.txt', userRequest + " " + searchTitle + " " + "\n", (err) => {
	if (err) throw err;
	console.log("liri.js was appended to the file!")
});

switch(userRequest){
	case "my-tweets":
	var grabData = require('./keys.js');
	myTweets();
	break;


	case "spotify-this-song":
	myMusic();
	break;


	case "movie-this":
	myMovie();
	break;


	case "do-what-it-says":
	randomnSong();
	break;
};

function myTweets(){
	var grabData = require('./keys.js');

};

function myMusic(){
	var song = [];
	if (!searchTitle){
		searchTitle = "The Sign Ace of Base";
	}
	// for (i=3; i<process.argv.length; i++){
	// 	song.push(process.argv[i]);
	// 	}

	spotify.search({type: 'track', query: searchTitle}, function(err, data){
		var albumtrack = data.tracks.items;
		for (i=0; i < albumtrack.length; i++){
		var artistVar =  albumtrack[i].artists[i].name

		console.log("Artist: " + artistVar);
		console.log("Track Title: " + albumtrack[i].name);
		console.log("Spotify Link: " + albumtrack[i].preview_url);
		console.log("Album Title: " + albumtrack[i].album.name);
		return;
		}
		if (!searchTitle || err){
		searchTitle = "The Sign";
		var artistVar = "Ace of Base";
	}
	});
};

function myMovie(){
	var argV3 = [];
	for (var i =3; i<process.argv.length; i++){
		argV3.push(process.argv[i]);
	}
	OMDB("http://www.omdbapi.com/?t=" + argV3 + "&y=&plot=short&r=json", function(error, response, body){
		if (!error && response.statusCode === 200){
			console.log("The title of the movie is: " + JSON.parse(body).Title);
			console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
			console.log("The movie was released on: " + JSON.parse(body).Released);
			console.log("The movie was produced in: " + JSON.parse(body).Country);
			console.log("The language of the movie is: " + JSON.parse(body).Language);
			console.log("The plot of the movie is: " + JSON.parse(body).Plot);
			console.log("The actors in this movie are: " + JSON.parse(body).Actors);
			console.log("The language of the movie is: " + JSON.parse(body).Language);
			console.log("The Rotten Tomatoes Rating for this movie is :" + JSON.parse(body).Ratings[1].Value);
			console.log("The website for this movie is: " + JSON.parse(body).Website);
		}
	})
	if (!searchTitle){
		searchTitle = "Mr. Nobody";
	OMDB("http://www.omdbapi.com/?t=" + searchTitle + "&y=&plot=short&r=json", function(err, response, body){
		if (err){
			console.log("Error occured: " + err);
			return;
		}
		else{
			console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
			return;
		}
	});
	}
};

function randomnSong(){
	var data = fs.readFile('./random.txt', 'UTF-8', function(error, data){
		if (error){
			console.log(error);
		}
		else{
			var myData = data.split(',');
			console.log(myData);
			if (myData[0] === 'spotify-this-song'){
				searchTitle = myData[1];
				myMusic();
			}
			if (myData[0] === 'my-tweets'){
				myTweets();
			}
			if (myData[0] === 'movie-this'){
				searchTitle = myData[1];
				myMovie();
			}
			//myMusic();
		}	
	})

};

