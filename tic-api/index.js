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
        var roomCode = randomString.generate(5);
        socket.join(roomCode);
        socket.emit("room_created", roomCode);
    });
    socket.on("ready", ()=> {
        console.log("User is ready");
    })

    socket.on('change_state', (xo, turn, room) => {
        console.log(xo);
        io.to(room).emit("changed_state", xo, turn);
    })
    socket.on("start_game", async (room) => {
        io.in(room).emit("start");
        function getClientsInRandomOrder() {
            const clients = Array.from(io.sockets.adapter.rooms.get(room) || []); 
            if (clients.length === 0) return null; // No sockets in the room
            const randomIndex = Math.floor(Math.random() * clients.length);
            console.log(`Random index is ${randomIndex}`);
            return [clients[randomIndex], clients[randomIndex === 0 ? 1 : 0]];
        }

          const randomSocketId = await getClientsInRandomOrder(io, room);
          io.to(randomSocketId[0]).emit('x');
          io.to(randomSocketId[1]).emit('o');
    })
    socket.on("join_room", (room) => {
        const rooms = io.sockets.adapter.rooms;
        if (rooms.has(room)) {
            const roomSize = rooms.get(room)?.size;
            console.log(roomSize+1);
            if (roomSize+1 > 2) { socket.emit("full_room"); }
            else {
                socket.join(room);
                io.in(room).emit("joined", room, roomSize+1);
            }
        } else {
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