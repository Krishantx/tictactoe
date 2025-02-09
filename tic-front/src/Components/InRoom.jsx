import { useEffect, useState } from "react"
import { io } from "socket.io-client";

function InRoom(props) {
    const [buttonState, setButtonState] = useState(false);
    const [roomCode, setRoomCode] = useState(props.roomCode);
    function ready() {
        setButtonState(!buttonState);
    }
    return <div><h1>Room Code: {roomCode}</h1>
    <h2>Waiting for all players to join or to be ready</h2>
    <button value="Ready" onClick={ready}>{buttonState ? "" : "Not "}Ready</button>
    <p>Players in room {props.roomSize}/2</p></div>
}

export default InRoom;