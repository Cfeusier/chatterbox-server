var goose = require('mongoose');

module.exports = function() {
  var pEnv = process.env;
  var devUrl = 'mongodb://localhost/chitchatroom_dev';
  var dbUri = pEnv.MONGOLAB_URI || pEnv.MONGOHQ_URL  || devUrl;
  goose.connect(dbUri);
  var db = goose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function(callback) {
    console.log("mongo is now connected, gametime");
  });
};