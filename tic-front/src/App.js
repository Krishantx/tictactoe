import { io } from "socket.io-client";
import CreateRoom from "./Components/CreateRoom";
import JoinRoom from "./Components/JoinRoom"
import Or from "./Components/Or"
const socket = io("http://localhost:2828/");
function App() {
  function createRoom() {
    socket.emit("create_room", "");
}
  socket.on("connect", ()=> {
    console.log(`connected to server`);
  })
  return <div>
    <CreateRoom CreateRoom = {createRoom}/>
    <Or />
    <JoinRoom />
    </div>
}

export default App;
