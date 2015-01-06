var goose = require('mongoose');

module.exports = function() {
  goose.connect(MONGOLAB_URI);
  var db = goose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function(callback) {
    console.log("mongo is now connected, gametime");
  });
};