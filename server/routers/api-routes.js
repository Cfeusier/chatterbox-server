var util = require('../utils/help');
var models = require('../config/models')();

module.exports = function(app) {
  app.get('/classes/chatterbox', function(req, res) {
    models.message.find({}, function(err, messages) {
      util.respond(res, { results: messages });
    });
  });

  app.post('/classes/chatterbox', function(request, response) {
    util.prepare(request, function(message) {
      util.respond(response, message);
    });
  });

  app.options('/classes/chatterbox', function(req, res) {
    util.respond(res, null);
  });
};