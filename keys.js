// console.log('this is loaded');

var spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

var omdb = process.env.omdb_key;

var bandsintown = process.env.bandsintown_key;

module.exports = {
    spotify: spotify,
    omdb: omdb,
    bandsintown: bandsintown
}