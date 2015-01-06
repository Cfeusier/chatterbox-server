var goose = require('mongoose');

module.exports = function() {
  var pEnv = process.env;
  var devUrl = 'mongodb://localhost/chitchatroom_dev';
  goose.connect(pEnv.MONGOLAB_URI || pEnv.MONGOHQ_URL  || devUrl);
  var db = goose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', console.log.bind(console, "mongo is now connected, gametime"));
};