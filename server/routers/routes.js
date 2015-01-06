module.exports = function(app) {
  require('./api-routes')(app);
  require('./user-routes')(app);
};