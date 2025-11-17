import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(__dirname));

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", (socket) => {
  console.log("client connected");

  socket.on("message", (msg) => {
    for (const client of wss.clients) {
      if (client.readyState === 1) client.send(msg.toString());
    }
  });

  socket.on("close", () => console.log("client left"));
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log("WS server running on " + port));
