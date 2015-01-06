var goose = require('mongoose');

module.exports = function() {
  goose.connect('mongodb://127.0.0.1/chatterbox_dev');
  var db = goose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function(callback) {
    console.log("mongo is now connected, gametime");
  });
};