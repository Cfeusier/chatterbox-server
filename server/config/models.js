var goose = require('mongoose');

var Schema = goose.Schema;
var MessageSchema = new Schema({
  text: { type: String },
  username: { type: String },
  roomname: { type: String, default: "All Rooms" },
  createdAt: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
});


module.exports = function() {
  var models = { message: goose.model('Message', MessageSchema) };
  return models;
};
