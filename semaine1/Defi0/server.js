
let express = require('express')
let http = require('http')
let fs = require('fs');
let path = require('path');
let app = express();



app.set('port', process.env.PORT || 8080);

app.use(express.static(path.join('/home/bobby/InesWork/Defi0v2', 'public')));

let  server = http.createServer(app);

server.listen(app.get('port'), function () {

    console.log("Express server listening on port " + app.get('port'));

});

//create a route
app.get('/', function (req, res) {

  res.sendfile('public/converter.html');

});