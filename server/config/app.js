var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

module.exports = function() {
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(express.static(path.join(__dirname, '../../client')));
  return app;
};