var models = require('../config/models')();

exports.createMsg = function(request, cb) {
  models.message.create(request.body).then(cb);
};

exports.findMsg = function(query, cb) {
  models.message.find({}, function(err, messages) { cb(messages); });
};