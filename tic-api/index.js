import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
let server = http.createServer(app);
const port = 2828;
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("New user connected");
})

app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(port, () => {
    console.log(`Server on port ${port}`);
})