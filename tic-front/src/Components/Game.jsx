import Cell from "./Cell";
import { useState } from "react";

function Game() {
    const [xo, setXO] = useState(['', '', '', '', '', '', '', '', '']);
    const [turn, setTurn] = useState('x');
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    function move(i) {
        setXO(prevArr => {
            const newArr = [...prevArr];
            newArr[i] = turn;
            setTurn(t => {
                if (t === 'x') { return 'o'; }
                else {return 'x'; }
            })
            return newArr;
        })
    }
    return (
        <div className="game-container">
            <h1 className="title">Tic Tac Toe</h1>
            <div className="board">
                {a.map((i) => (
                    <Cell key={i} i={i} move={move} state={xo[i]}/>
                ))}
            </div>
            <p className="status">Next Player: X</p>
            <button className="reset-button">Reset Game</button>
        </div>
    );
}

export default Game;
