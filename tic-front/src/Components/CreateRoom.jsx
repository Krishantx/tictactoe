import { useEffect } from "react";
import { io } from "socket.io-client";
function CreateRoom(props) {
    
    return <button onClick={props.CreateRoom}>Create Room</button>
}

export default CreateRoom;