var api = {};
global.api = api;
api.net = require('net');

var sIp = '127.0.0.1';
var sPort = 2000;

var socket = new api.net.Socket();
var result = [];

socket.connect({
  port: sPort,
  host: sIp,
}, function() {
  console.log('Connected to server');
  socket.on('data', function(data) {
    console.log('Data received: ' + data);
    data = JSON.parse(data);
    for (var i = 0; i < data.length; i++) {
      multiplyByTwo(data[i]);
    }
    socket.write(JSON.stringify(result));
  });
});

function multiplyByTwo(number) {
  result.push(number * 2);
}
