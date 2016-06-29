var express = require('express');
var app = express();

app.all('/', function (req, res) {
	res.send('hello worldddd!');
});

app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP, function () {
  //console.log('Current app listening on port ' + process.env.OPENSHIFT_NODEJS_PORT);
  //console.log('Environment: ' + app.get('env'));
  //console.log('Dir Name: ' + __dirname);
});