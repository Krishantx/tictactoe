import { io } from "socket.io-client";
import InRoom from "./Components/InRoom";
import NotInRoom from "./Components/NotInRoom";
import { useState } from "react";
const socket = io("http://localhost:2828/");
function App() {
  const [roomCode, setRoomCode] = useState(null);
  const [roomSize, setRoomSize] = useState(0);
  const [er, setEr] = useState(false);
  function createRoom() { socket.emit("create_room"); }
  function joinRoom(roomName) { 
    socket.emit("join_room", roomName)
    console.log(`join room triggered with code ${roomName}`);
  }
socket.on("joined", (room, roomS) => {
  console.log("Joined the room");
  setRoomSize(roomS);
  setRoomCode(room)
})
socket.on("room_error", ()=> {
  setEr(true);
})
socket.on("room_created", (room) => {
  setRoomCode(room);
  console.log(`Room code: ${room}`);
})

  socket.on("connect", ()=> {
    console.log(`connected to server`);
  })
  return <div>
    {roomCode === null ? <NotInRoom er = {er} joinRoom = {joinRoom} createRoom = {createRoom}/> : <InRoom roomCode = {roomCode} roomSize = {roomSize}/>}
  </div>
}

export default App;
