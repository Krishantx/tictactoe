import "./CreateRoom.css"; // Import the CSS file

function CreateRoom(props) {
    return (
        <button className="create-room-button" onClick={props.createRoom}>
            Create Room
        </button>
    );
}

export default CreateRoom;
