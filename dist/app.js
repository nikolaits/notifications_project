"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rateLimit = require('ws-rate-limit');
const express_1 = __importDefault(require("express"));
const _cors = __importStar(require("cors"));
const ws = __importStar(require("ws"));
const app = express_1.default();
let server = undefined;
const port = 3002;
const wsport = 9191;
let wss;
const limiter = rateLimit('20s', 100);
startServer();
function startWebSockerServer() {
    console.log("Start web socket on port", wsport);
    wss = new ws.Server({ port: wsport });
    wss.on('connection', (ws) => {
        console.log("new connection");
        limiter(ws);
    });
    wss.on("error", (err) => {
        console.log("WebSocket error ", err);
    });
}
function sendNotification(msg) {
    wss.clients.forEach((client) => {
        if (client && (client.readyState === ws.OPEN)) {
            client.send(JSON.stringify({}));
        }
    });
}
function startServer() {
    app.use(express_1.default.json());
    app.use(_cors.default({
        origin: '*'
    }));
    app.use(express_1.default.static('public'));
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });
    server = app.listen(port, err => {
        if (err) {
            return console.error(err);
        }
        startWebSockerServer();
        return console.log(`server is listening on ${port}`);
    });
}
//# sourceMappingURL=app.js.map