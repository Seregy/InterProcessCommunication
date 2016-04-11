var api = {};
global.api = api;
api.net = require('net');

var port = 2000;

var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
var results = [];
var clients = [];

var server = api.net.createServer();
server.listen(port);

server.on('connection', function(socket) {
  // Adding new client to the list
  socket.name = socket.remoteAddress + ':' + socket.remotePort;
  console.log('Connected: ' + socket.name);
  clients.push({socket: socket, result: [], index: []});

  if (clients.length > 1) {

    for (var i = 0; i < task.length; i++) {
      clients[i % clients.length].result.push(task[i]);
      clients[i % clients.length].index.push(i);
    }

    for (var i = 0; i < clients.length; i++) {
      clients[i].socket.write(JSON.stringify(clients[i].result));
    }
  }

  socket.on('data', function(data) {
    data = JSON.parse(data);
    if (data.constructor === Array) {
      var client = getClient(socket.name);
      client.result = data;
      restoreArray(client);
    }
  });

  socket.on('close', function(data) {
    console.log(socket.name + ' has disconnected');
    removeSocket(socket);
  });
});

function removeSocket(socket) {
  var client = getClient(socket.name);
	clients.splice(clients.indexOf(client), 1);
  if (clients.length === 0)
    console.log('Result: ' + results);
};

function restoreArray(client) {
  for (var i = 0; i < client.result.length; i++) {
    results[client.index[i]] = client.result[i];
  }
}

function getClient(socketName) {
  for (var i = 0; i < clients.length; i++) {
    if (clients[i].socket.name === socketName) {
      return clients[i];
    }
  }
}



console.log('Server is running at port ' + port);
console.log('Task: ' + task);
