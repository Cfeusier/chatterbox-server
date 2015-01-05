var path = require('path');
var handleRequest = require('./request-handler');

var router = function(app) {
  app.get('/classes/chatterbox', function(req, res) {
    handleRequest(req, res);
  });
  app.post('/classes/chatterbox', function(req, res) {
    handleRequest(req, res);
  });
  app.options('/classes/chatterbox', function(req, res) {
    handleRequest(req, res);
  });
  app.get('*', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../client') });
  });
};

module.exports = router;