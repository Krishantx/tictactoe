import { io } from "socket.io-client";
import InRoom from "./Components/InRoom";
import NotInRoom from "./Components/NotInRoom";
import Game from "./Components/Game";
import { useState } from "react";
const socket = io("http://localhost:2828/");
function App() {
  const [xo, setXO] = useState(['', '', '', '', '', '', '', '', '']);
  const [roomCode, setRoomCode] = useState(null);
  const [roomSize, setRoomSize] = useState(0);
  const [er, setEr] = useState(false);
  const [fullRoom, setFullRoom] = useState(false);
  const [turn, setTurn] = useState('x');

  const AppState = {
    NotInRoom : "NOT_IN_ROOM",
    InRoom : "IN_ROOM",
    InGame : "IN_GAME"
  };

  const [appState, setAppState] = useState("NOT_IN_ROOM");
  function send(newArr, t) {
    console.log(`Sending data: ${newArr} and ${t}`);
    //console.log(newArr);
    socket.emit('change_state', newArr, t, roomCode);
  }
  function start() {
    socket.emit('start_game', roomCode);
  }
  function createRoom() {
    socket.emit("create_room");
   }
  function joinRoom(roomName) { 
    socket.emit("join_room", roomName)
    console.log(`join room triggered with code ${roomName}`);
  }
  function readyPlayer(ready) {
    if (ready) {
      socket.emit("ready");
    }
  }
socket.on('changed_state', (newXO, t) => {
  console.log(`recovered data ${newXO} & ${t}`);
  //console.log(newXO);
  setXO(newXO);
  setTurn(t)
})
socket.on("joined", (room, roomS) => {
  console.log("Joined the room");
  setRoomSize(roomS);
  setRoomCode(room);
  setAppState("IN_ROOM");
})
socket.on("start", () => {
  setAppState("IN_GAME");
})


socket.on("room_error", ()=> {
  setEr(true);
})


socket.on("room_created", (room) => {
  setRoomCode(room);
  console.log(`Room code: ${room}`);
  setAppState("IN_ROOM");
})


  socket.on("connect", ()=> {
    console.log(`connected to server`);
  })


  socket.on("full_room", ()=> {
    setFullRoom(true);
  })

  switch (appState) {
    case AppState.InGame:
      return (<Game xo = {xo} setXO = {setXO} send = {send} turn = {turn} setTurn = {setTurn}/>)
      break;

    case AppState.NotInRoom:
      return (<NotInRoom isFull = {fullRoom} er = {er} joinRoom = {joinRoom} createRoom = {createRoom}/>)
      break;

    case AppState.InRoom:
      return (<InRoom start = {start} roomCode = {roomCode} roomSize = {roomSize} playerReady = {readyPlayer}/>);
      break;
  }
}

export default App;
