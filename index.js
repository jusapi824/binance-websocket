
const express = require('express');
const app = express();
const binance = require('./binanceConfig');
const WebSocket = require('ws');

app.set('port', process.env.PORT || 4000)

app.get('/websocket', (req,res)=>{
    const wsServer = new WebSocket.Server({
        port: 3000
        // port: app.get('port')
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
    
    console.log( (new Date()) + " Server is listening on port " + PORT);
})


app.get('/', (req, res) => {
    res.send('Hello World 2');
} );

app.get('/crypto', (req, res) => {
    // res.send('Hello World');
    // Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
binance.websockets.candlesticks(['BNBBTC'], "1m", (candlesticks) => {
    let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
    let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
    console.info(symbol+" "+interval+" candlestick update");
    console.info("open: "+open);
    console.info("high: "+high);
    console.info("low: "+low);
    console.info("close: "+close);
    console.info("volume: "+volume);
    console.info("isFinal: "+isFinal);
  });
});

// Starting the Server
app.listen(app.get('port'), ()=>{ // Se inicia el servidor en el puerto configurada
    console.log(`Server running o localhost:${app.get('port')} `)
});
