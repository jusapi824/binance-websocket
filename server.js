
const WebSocket = require('ws');

// const WSPORT =  process.env.PORT || 4000;
const WSPORT =  process.env.PORT || Deno.env.get("PORT") || 4000;

const wsServer = new WebSocket.Server({
    port: WSPORT
});

wsServer.on('connection', function (socket) {
    // Some feedback on the console
    console.log("A client just connected");

    // Attach some behavior to the incoming socket
    socket.on('message', function (msg) {
        console.log("Received message from client: "  + msg);
        // socket.send("Take this back: " + msg);

        // Broadcast that message to all connected clients
        wsServer.clients.forEach(function (client) {
            client.send("Someone said: " + msg);
        });

    });

    socket.on('close', function () {
        console.log('Client disconnected');
    })

});

console.log( (new Date()) + " Server is listening on port " + WSPORT);