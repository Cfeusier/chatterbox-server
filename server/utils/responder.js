var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

var setHeaders = function(response) {
  for (var header in headers) {
    var value = headers[header];
    response.set(header, value);
  }
};

exports.respond = function(response, data, status) {
  status = status || 200;
  setHeaders(response);
  response.status(status).send(data);
};