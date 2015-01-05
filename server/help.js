var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

exports.respond = function(res, data, status) {
  status = status || 200;
  res.writeHead(status, headers);
  res.end(JSON.stringify(data));
};

exports.prepareToSend = function(req, cb) {
  var data = "";
  req.on("data", function(piece) { data += piece; });
  req.on("end", function() { cb(JSON.parse(data)); });
};