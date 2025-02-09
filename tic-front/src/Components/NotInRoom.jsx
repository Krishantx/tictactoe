import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import Or from "./Or";

function NotInRoom(props) {
    return <div>
    <CreateRoom createRoom = {props.createRoom} />
    <Or />
    <JoinRoom er = {props.er}joinRoom = {props.joinRoom} />
    </div>
}
export default NotInRoom;