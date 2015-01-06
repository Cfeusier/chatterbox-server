var app = require('./config/app')();
app.listen(process.env.PORT || 3000);
module.exports = app;