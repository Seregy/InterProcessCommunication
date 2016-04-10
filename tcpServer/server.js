var api = {};
global.api = api;
api.net = require('net');

var port = 2000;

var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
var results = [];

var server = api.net.createServer(function(socket) {
  socket.write(JSON.stringify(task));
  console.log('Connected: ' + socket.localAddress);
  socket.on('data', function(data) {
    console.log('Data received: ' + JSON.parse(data));
  });
}).listen(port);

console.log('Server is running at port ' + port);