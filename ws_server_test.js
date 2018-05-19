#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');
 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
 





wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});
 



     wsServer.broadcast = function broadcast(data) {
wsServer.connections.forEach(function each(client) {
  client.sendUTF(data);
 });
};





function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

connection_id = 0;
connection = {};
 
wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {

      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
connection_id += 1;

    connection[connection_id] = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection[connection_id].on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
           // connection[connection_id].sendUTF(message.utf8Data);
    wsServer.broadcast(message.utf8Data);
   

        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection[connection_id].sendBytes(message.binaryData);
            
        }
    });
    connection[connection_id].on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection[connection_id].remoteAddress + ' disconnected.');
    });



});