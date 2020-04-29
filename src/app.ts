const rateLimit = require('ws-rate-limit');
import express from 'express';
import * as _cors from "cors";
import * as ws from "ws";
const app = express();
let server = undefined;
const port = 3002;
const wsport = 9191;
let wss: ws.Server;
const limiter = rateLimit('20s', 100);

startServer();
function startWebSockerServer(){
    console.log("Start web socket on port", wsport);
    wss = new ws.Server({ port: wsport });
    wss.on('connection', (ws)=>{
        console.log("new connection")
        limiter(ws);
    });
    wss.on("error", (err)=>{
        console.log("WebSocket error ", err);
    });
}
function sendNotification(msg:String){
    wss.clients.forEach((client) => {
        if (client && (client.readyState === ws.OPEN)) {
            client.send(JSON.stringify({}));
        }
    })
}
function startServer() {
    app.use(express.json());
    app.use(_cors.default({
        origin: '*'
    }));
    app.use(express.static('public'));
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });
    server = app.listen(port, err => {
        if (err) {
            return console.error(err);
        }
        startWebSockerServer();
        return console.log(`server is listening on ${port}`);
    })
}

