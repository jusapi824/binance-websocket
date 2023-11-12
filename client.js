const websocket = require('ws');

// const serverAdress = 'ws://localhost:3001';
const serverAdress = 'wss://websocket-test-jp.glitch.me/';
const ws = new websocket(serverAdress, {
   'user-agent': 'Mozilla',
});

ws.on('open', () => {
   console.log('Connection established');
   ws.send('Hello Server');
});

ws.on('message', (data) => {
   console.log('Received message from server: ' + data);
});