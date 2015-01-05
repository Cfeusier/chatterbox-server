var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlUtil = require("url");
var handleRequest = require("./request-handler");

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, '../client')));

routes(app); // instantiate router
app.listen(process.env.PORT || 3000); // start server

module.exports = app;