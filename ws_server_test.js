var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 8080})

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

  
  
  
  setInterval(
    () => ws.send(`${new Date()}`),
    3000
  )
})
