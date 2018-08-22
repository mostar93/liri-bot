require("dotenv").config();

var fs = require("fs");

var movieTitle = process.argv.slice(3).join(" ");
var song = process.argv.slice(3).join(" ");
var artist = process.argv.slice(3).join(" ");
var keys = require("./keys")


var ombdURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + keys.omdb;
var bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsintown;
// var spotifyURL = "https://api.spotify.com/v1/search?q=" + song

var request = require("request");
var moment  = require("moment");

function getBand (){
    request (bandsURL, function(error, response, body){
        if (!error && response.statusCode === 200) {
            console.log("===========================\n")
            // console.log(JSON.parse(body)[0]);
            console.log("\nVenue is: " + JSON.parse(body)[0].venue.name);
            console.log("\nLocation is: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.country);
            console.log("\nShow Date is: " + moment(JSON.parse(body)[0].datetime.slice(0, 10), 'YYYY-MM-DD').format("MM/DD/YYYY"));
            console.log("\n===========================");
        }
    })
}

function getmovie(){
    request(ombdURL, function(error, response, body){
        if (!error && response.statusCode === 200){
            
            console.log("===========================\n")
            console.log("Title:  " + JSON.parse(body).Title);
            console.log("Year:  " + JSON.parse(body).Year);
            console.log("imdb Rating:  " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes:  " + JSON.parse(body).Ratings[1].Value);
            console.log("Country:  " + JSON.parse(body).Country);
            console.log("Language:  " + JSON.parse(body).Language);
            console.log("Actors:  " + JSON.parse(body).Actors);
            console.log("\n===========================")
            
        }
    })
}

function getSong (){
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
      id: keys.spotify.id,
      secret: keys.spotify.secret,
    });
    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    var songInfo = data.tracks.items;
    console.log("===========================\n")
    console.log("Artist Name: " + songInfo[0].album.artists[0].name); 
    console.log("Song Name: " + songInfo[0].name);
    console.log("Preview Link: " + songInfo[0].external_urls.spotify); 
    console.log("Album Name: " + songInfo[0].album.name); 
    console.log("\n===========================")
    
    });
}

function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } else {
            console.log(data);
            backstreet = data.split(",");
            song = backstreet[1];
            getSong();
        }
    })
}


switch (process.argv[2]) {
    case "movie-this":
        getmovie();
        break;
    case "concert-this":
        getBand();
        break;
    case "spotify-this":
        getSong();
        break;
    case "do-what-it-says":
        doIt();
        break;
}

// if (process.argv[2] === "movie-this"){
//     getmovie();
// } 
// else {
//     movieTitle = "Mr. Nobody";
//     ombdURL =  "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
//     getmovie();
// }