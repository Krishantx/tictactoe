function Cell(props) {
    if (props.i === 9) {
        console.log(props.state);
    }
    if (props.state === '' && props.turn === props.you) {
        return <div onClick={()=> {props.move(props.i);}} className="cell" id={"c" + props.i}>{props.state}</div>
    } else {
        return <div  className="cell" id={"c" + props.i}>{props.state}</div>
    }
    
}


export default Cell;