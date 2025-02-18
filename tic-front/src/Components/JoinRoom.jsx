import { useState } from "react";
import "./JoinRoom.css"; // Import CSS file

function JoinRoom(props) {
    const [name, setName] = useState("");

    return (
        <div className="join-room-container">
            <input
                className="room-input"
                name="roomID"
                type="text"
                placeholder="Enter Room ID"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <button className="join-button" onClick={() => props.joinRoom(name)}>
                Join Room
            </button>
            {props.er && <p className="error-text">Room does not exist. Enter a valid room code.</p>}
            {props.isFull && <p className="error-text">The room is full.</p>}
        </div>
    );
}

export default JoinRoom;
