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

    socket.on("create_room", () => {
        console.log("Create Room triggered");
        var roomCode = randomString.generate(5);
        console.log(roomCode);
        socket.join(roomCode);
        socket.emit("room_created", roomCode);
    });

    socket.on("join_room", (room) => {
        const rooms = io.sockets.adapter.rooms;
        if (rooms.has(room)) {
            const roomSize = rooms.get(room)?.size;
            if (roomSize > 2) { socket.emit("full_room"); }
            console.log("Join room triggered");
            socket.join(room);
            
            io.in(room).emit("joined", room, roomSize);
        } else {
            console.log("Room does not exist");
            socket.emit("room_error");
        }
        
    })
})



app.get("/", (req, res) => {
    res.send("Hello");
})


server.listen(port, () => {
    console.log(`Server on port ${port}`);
})