function Cell(props) {
    function turn() {
        
    }
    return <div onClick={()=> {props.move(props.i);}} className="cell" id={"c" + props.i}>{props.state}</div>
}


export default Cell;