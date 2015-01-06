require('./config/db')();
var app = require('./config/app')();
require('./routers/routes')(app);
app.listen(process.env.PORT || 3000);
module.exports = app;