var util = require('../utils/responder');
var collec = require('../utils/messageHandler');

module.exports = function(app) {
  app.get('/classes/chatterbox', function(req, res) {
    collec.findMsg({}, function(messages) {
      util.respond(res, { results: messages });
    });
  });

  app.post('/classes/chatterbox', function(req, res) {
    collec.createMsg(req, function(message) {
      util.respond(res, message);
    });
  });

  app.options('/classes/chatterbox', function(req, res) {
    util.respond(res, null);
  });
};