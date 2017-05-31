var express = require('express');
var app = express();
var staticDir = __dirname + "/public";

app.use(express.static(staticDir));


var server = app.listen(3001, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
