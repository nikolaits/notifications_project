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
const types = ["text", "bonus", "Promotion"];
const links=["https://www.facebook.com/","https://google.com", "https://abv.bg"]
function randomNumber(min:number, max:number) {
    return Math.floor(Math.random() * (max - min) + min);
}
function generateNotification(type?:string){
    let newNotification={};
    newNotification['id'] = Math.floor(randomNumber(1000, 6000));
    newNotification['type'] = types[Math.floor(randomNumber(0, 2))];
    if(type){
        newNotification['type'] = type;
    }
    switch (newNotification['type']) {
        case "text":
            newNotification['title'] = "Test notification"+Math.floor(randomNumber(1000, 6000));
            newNotification['text'] = "Test text notification"+Math.floor(randomNumber(1000, 6000));
            newNotification['expires'] = 3000;
            newNotification['date'] = new Date().toString();
            break;
        case "bonus":
            newNotification['title'] = "You win a bonus!"+Math.floor(randomNumber(1000, 6000));
            newNotification['requirement'] = "Deposit $50 to win"+Math.floor(randomNumber(1000, 6000));
            newNotification['expires'] = 3000;
            newNotification['date'] = new Date().toString();
            break;
        case "Promotion":
            newNotification['title'] = "%30 off on sports betting"+Math.floor(randomNumber(1000, 6000));
            newNotification['image'] = "https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png";
            newNotification['link'] = "https://www.google.com/";
            newNotification['date'] = new Date().toString();
            break;
        default:
            break;
    }
    return newNotification;
}

function sendNotification(msg:String){
    wss.clients.forEach((client) => {
        if (client && (client.readyState === ws.OPEN)) {
            client.send(msg);
        }
    })
}
function sendInitNotification(client){
    let n = generateNotification("Promotion");
    client.send(JSON.stringify(n));
    let n2 = generateNotification("Promotion");
    client.send(JSON.stringify(n2));
    setInterval(()=>{
        n["link"]=links[Math.floor(randomNumber(0, 2))];
        n["date"]=new Date().toString();
        // n2["title"]="%30 off on sports betting"+Math.floor(randomNumber(1000, 6000));
        // client.send(JSON.stringify(n2));
        client.send(JSON.stringify(n));
    },7000);
}
function generateNotifications(){
    setInterval(() => {
        let n = generateNotification();
        sendNotification(JSON.stringify(n));
    }, 10000);
}
function startWebSockerServer(){
    console.log("Start web socket on port", wsport);
    wss = new ws.Server({ port: wsport });
    generateNotifications();
    wss.on('connection', (ws)=>{
        console.log("new connection");
        
        limiter(ws);
        sendInitNotification(ws);
        
    });
    wss.on("error", (err)=>{
        console.log("WebSocket error ", err);
    });
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

startServer();