var express = require('express');
var app = express();
var path = require('path');
var apiRoutes = require('./api-routes');
var userRoutes = require('./user-routes');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlUtil = require("url");

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, '../client')));

apiRoutes(app);
userRoutes(app);
app.listen(process.env.PORT || 3000); // start server

module.exports = app;