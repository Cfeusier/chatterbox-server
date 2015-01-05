var help = require('./help');

var objectId = 1;
var db = [
  {
    text: "text message",
    username: "clark",
    objectId: objectId
  }
];

var verbs = {
  'GET': function(req, res) { help.respond(res, { results: db }); },

  'POST': function(req, res) {
    help.prepareToSend(req, function(message) {
      // write to db
      db.push(message);
      message.objectId = ++objectId;
    });
    help.respond(res, { objectId: 1 }, 200);
  },

  'OPTIONS': function(req, res) { help.respond(res, false); }
};

var requestHandler = function(req, res) {
  var mtd = verbs[req.method];
  mtd ? mtd(req, res): help.respond(res, "Resource Not Found, yo", 404);
};

module.exports = requestHandler;