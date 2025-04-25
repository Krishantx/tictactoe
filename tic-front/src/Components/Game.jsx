import Cell from "./Cell";
import { useEffect, useState } from "react";

function Game(props) {
    const [justChanged, setJustChanged] = useState(false);


    const a = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    useEffect(()=> {
        console.log("Updated XO:", props.xo);
        if (justChanged) {
        props.send();
        setJustChanged(false);
        }
    }, [props.xo]);
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
        setJustChanged(true);
        console.log(props.xo);
        
    }
    return (
        <div className="game-container">
            <h1 className="title">Tic Tac Toe</h1>
            <h2 className="subtitle">You are : {props.you}</h2>

            <div className="board">
                {a.map((i) => (
                    <Cell key={i} i={i} turn = {props.turn} you = {props.you} move={move} state={props.xo[i]}/>
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
