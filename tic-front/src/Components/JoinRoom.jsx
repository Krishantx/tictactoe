import { useState } from "react";

function JoinRoom(props) {
    const [name, setName] = useState("");
    return <div>
    <input name="roomID" type="text" value = {name} onChange={(event)=> setName(event.target.value)}/>
    <button onClick={() => {props.joinRoom(name)}}>Join Room</button>
    {props.er ? <p style={{color:"red"}}>Room Does not exist. Enter a valid room code</p> : null}
    </div>
}

export default JoinRoom;