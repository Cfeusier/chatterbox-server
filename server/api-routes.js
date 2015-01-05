var util = require('./help');

var objectId = 1;
var db = [
  {
    text: "text message",
    username: "clark",
    objectId: objectId
  }
];

module.exports = function(app) {
  // GET
  app.get('/classes/chatterbox', function(req, res) {
    util.respond(res, { results: db });
  });

  // POST
  app.post('/classes/chatterbox', function(req, res) {
    util.prepareToSend(req, function(message) {
      // write to db
      db.push(message);
      message.objectId = ++objectId;
    });
    util.respond(res, { objectId: 1 }, 200);
  });

  // OPTIONS
  app.options('/classes/chatterbox', function(req, res) {
    util.respond(res, null);
  });
};