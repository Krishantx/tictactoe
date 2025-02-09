import express from "express";
import randomString from 'randomized-string';
import { Server } from "socket.io";
import http from "http";

const app = express();
let server = http.createServer(app);
const port = 2828;
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",  // Allow requests from the frontend
      methods: ["GET", "POST"],         // Allowed HTTP methods
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("create_room", (socket) => {
        console.log("Create Room triggered");
    });
})



app.get("/", (req, res) => {
    res.send("Hello");
})


server.listen(port, () => {
    console.log(`Server on port ${port}`);
})