import { useState } from "react";
import "./InRoom.css"; // Import the CSS file

function InRoom(props) {
    const [buttonState, setButtonState] = useState(false);
    const [roomCode] = useState(props.roomCode);

    function ready() {
        setButtonState(!buttonState);
        props.playerReady(buttonState);
    }

    return (
        <div className="in-room-container">
            <h1 className="room-code">Room Code: {roomCode}</h1>
            <h2 className="waiting-text">Waiting for all players to join or be ready</h2>
            <div className="button-group">
                <button className={`ready-button ${buttonState ? "ready" : "not-ready"}`} onClick={ready}>
                    {buttonState ? "Ready" : "Not Ready"}
                </button>
                <button className="start-button" onClick={props.start}>
                    Start
                </button>
            </div>
            <p className="players-info">Players in room {props.roomSize}/2</p>
        </div>
    );
}

export default InRoom;
