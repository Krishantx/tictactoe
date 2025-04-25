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
        if (checkWin()) {
            if (props.turn !== props.you) {
                console.log("You won!");
                props.win();
            }
        }
        }
    }, [props.xo]);
    //implement win function and this project is done
    function checkWin() {
        //Check Horizontal lines;
        for (var i = 0; i <= 5; i+=3) {
            if (props.xo[i] !== '' && props.xo[i] === props.xo[i+1] && props.xo[i] === props.xo[i+2]) {
                return true;
            }
        }
        //Check Verrtical Lines;
        for (var i = 0; i < 3; i++) {
            if (props.xo[i] !== '' && props.xo[i] === props.xo[i+3] && props.xo[i] === props.xo[i+6]) {
                return true;
            }
        }
        //Check diagonal Lines;
        if (props.xo[0] !== '' && props.xo[0] === props.xo[4] && props.xo[0] === props.xo[8]) {
            return true;
        }

        if (props.xo[2] !== '' && props.xo[2] === props.xo[4] && props.xo[2] === props.xo[6]) {
            return true;
        }
        return false;
    }
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
            {props.winner ? `${props.winner} won` : null}
            <h2 className="subtitle">You are : {props.you}</h2>

            <div className="board">
                {a.map((i) => (
                    <Cell key={i} i={i} winner = {props.winner} turn = {props.turn} you = {props.you} move={move} state={props.xo[i]}/>
                ))}
            </div>


            <p className="status">Next Player: {props.turn}</p>
            
            {/* Reset button restarts the game */}
            <button className="reset-button" onClick={() => {
                props.resetBoard();
                }}>Reset Game</button>
        </div>
    );
}

export default Game;
