import { io } from "socket.io-client";
import InRoom from "./Components/InRoom";
import NotInRoom from "./Components/NotInRoom";
import Game from "./Components/Game";
import { useState } from "react";
const socket = io("https://tictactoe-qz1b.onrender.com/");
function App() {
  const [xo, setXO] = useState(['', '', '', '', '', '', '', '', '']);
  const [roomCode, setRoomCode] = useState(null);
  const [roomSize, setRoomSize] = useState(0);
  const [er, setEr] = useState(false);
  const [fullRoom, setFullRoom] = useState(false);
  const [turn, setTurn] = useState('x');
  const [you, setYou] = useState();
  const [winner, setWinner] = useState();
  const AppState = {
    NotInRoom : "NOT_IN_ROOM",
    InRoom : "IN_ROOM",
    InGame : "IN_GAME"
  };

  const [appState, setAppState] = useState("NOT_IN_ROOM");


function resetBoard() {
  socket.emit('reset_board', roomCode) ;
  
}
  function win() {
    socket.emit(`won`, (turn === 'x' ? 'o' : 'x'), roomCode); 
  }
  function send() {
    //console.log(`Sending data: ${xo} and ${turn}`);
    //console.log(newArr);
    socket.emit('change_state', xo, turn, roomCode);
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
socket.on('resetted', () => {
  console.log("reset");
    setXO(['', '', '', '', '', '', '', '', '']);
  })
socket.on("lost", (win) => {
  setWinner(win);
})

socket.on('changed_state', (newXO, t) => {
  console.log(`recovered data ${newXO} & ${t}`);
  //console.log(newXO);
  if (newXO !== xo) {
    setXO(newXO);
    setTurn(t);
  }
  
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
socket.on('o', () => {
  console.log(`You are o`);
  setYou('o');
})
socket.on('x', () => {
  console.log(`You are x`);
  setYou('x');
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
      return (<Game resetBoard = {resetBoard} win = {win} winner = {winner} you = {you} xo = {xo} setXO = {setXO} send = {send} turn = {turn} setTurn = {setTurn}/>)
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
