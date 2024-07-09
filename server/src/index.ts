// src/index.js
import express, { Express, Request, Response } from "express";
import { WebSocketServer, WebSocket } from 'ws';
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const wss: WebSocketServer = new WebSocket.Server({ port: 8080 });

// WebSocket event handling
wss.on('connection', (ws) => {
    console.log('A new client connected.');
  
    // Event listener for incoming messages
    ws.on('message', (message) => {
      console.log('Received message:', message.toString());
  
      // Broadcast the message to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
    });
  
    // Event listener for client disconnection
    ws.on('close', () => {
      console.log('A client disconnected.');
    })
  });

app.get("/", (req: Request, res: Response) => {
    res.send("This is my Express + TypeScript Server");
});
  
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    console.log('hello world!')
});