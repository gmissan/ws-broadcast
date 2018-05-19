const WebSocket = require('ws');

var token = process.env.token;
console.log("el token es: "+token);
const wss = new WebSocket.Server({ port: 8080 });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    
    if (data != "" && data != null) {
    try {
   json = JSON.parse(data);
        
     if (json['token'] == token) {

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(json['data']);
      }
    });


} else {ws.send("token invalid");}


        

        }

   catch(err) {
    console.log(err);
}

    
    
    




    }
    


  });
});
