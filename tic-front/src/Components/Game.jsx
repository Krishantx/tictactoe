import Cell from "./Cell";
import { useState } from "react";

function Game(props) {

    const a = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    function move(i) {
        console.log(`${i} was clicked`);
        props.setXO(prevArr => {
            const newArr = [...prevArr];
            newArr[i] = props.turn;
            return newArr;
        })
        props.setTurn(t => 
            t === 'x' ? 'o' : 'x'
        );
        console.log(props.xo);
        props.send(props.xo, props.turn);
    }
    return (
        <div className="game-container">
            <h1 className="title">Tic Tac Toe</h1>


            <div className="board">
                {a.map((i) => (
                    <Cell key={i} i={i} move={move} state={props.xo[i]}/>
                ))}
            </div>


            <p className="status">Next Player: {props.turn}</p>
            
            {/* Reset button restarts the game */}
            <button className="reset-button" onClick={() => {
                props.setXO(['', '', '', '', '', '', '', '', ''])}}>Reset Game</button>
        </div>
    );
}

export default Game;
