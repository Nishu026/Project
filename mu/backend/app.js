import express, { json } from "express";
import connectDB from "./config/dbConnector.js";
import cors from "cors";
import answers from "./api/answers.js";
import http from "http";
import { Server as SocketServer } from "socket.io"; //handle http & websocket connection
const PORT = 5002;

//TODO: Integrate testing!

//**********************************Inits**********************************/
const app = express();
app.use(express.json());
connectDB();
app.use(cors());
app.use(json());

//**********************************Routes**********************************/
app.use("/api/answers", answers);
const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
    withCredentials: true,
  },//configure cors behaviour on web
});
// WebSocket connection event
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages from the client
  socket.on("message", (data) => {
    console.log("Received message:", data);

    // Broadcast the received message to all connected clients
    io.emit("message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
server.listen(4000, () => {
  console.log("websocket listening");
});
app.listen(PORT, () => {
  console.log("Go!", PORT);
});
