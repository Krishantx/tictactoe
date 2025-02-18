import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import Or from "./Or";
import "./NotInRoom.css";

function NotInRoom(props) {
    return (
        <div className="not-in-room-container">
            <CreateRoom createRoom={props.createRoom} />
            <Or />
            <JoinRoom er={props.er} joinRoom={props.joinRoom} isFull={props.isFull} />
        </div>
    );
}

export default NotInRoom;
