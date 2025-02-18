import Cell from "./Cell";

function Game() {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    function move() {
        console.log("Moves");
    }
    return (
        <div className="game-container">
            <h1 className="title">Tic Tac Toe</h1>
            <div className="board">
                {a.map((i) => (
                    <Cell onClick = {move} key={i} i={i} />
                ))}
            </div>
            <p className="status">Next Player: X</p>
            <button className="reset-button">Reset Game</button>
        </div>
    );
}

export default Game;
