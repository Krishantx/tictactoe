import { useEffect, useState } from "react";
import { io } from "socket.io-client";
function CreateRoom(props) {
    return <button onClick={props.createRoom}>Create Room</button>
}

export default CreateRoom;