function Cell(props) {
    function turn() {
        
    }
    return <div onClick={turn} className="cell" id={"c" + props.i}></div>
}


export default Cell;