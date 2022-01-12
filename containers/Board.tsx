import { listeners } from "process";
import { useEffect, useState } from "react"
import Square from "../components/Square";
type Player = 'X' | 'O' | 'BOTH' | null;

function calculateWinner(squares: Player[]) {
    const allPossibleLines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < allPossibleLines.length; i++) {
        const [a ,b ,c] = allPossibleLines[i]
        if(squares[a] && 
            squares[a] === squares[b] && 
            squares[a] === squares[c]){
                return squares[a]
        }
    }
    return null;
}

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState('X'); // first player is default
    const [winner, setWinner] = useState<Player>(null);

    // resetting the game
    function reset() {
        setSquares(Array(9).fill(null))
        setCurrentPlayer('X')
        setWinner(null)
    }

    function setSquareValue(index: number) {
        const newData = squares.map((val, i) => {
            if (i === index) {
                return currentPlayer
            }
            return val
        })
        setSquares(newData)
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }

    useEffect(() => {
        const w = calculateWinner(squares)
        if (w) {
            setWinner(w)
        }

        if (!w && !squares.filter(square => !square).length) {
            setWinner("BOTH")
        }

    }, [squares])

    return (
            <div className="row">
                {<p>{!winner ? `Player Turn: ${currentPlayer}` : "Results: "}</p>}
                {<p>{winner && winner !== "BOTH" ? `Congrats, player ${winner} won!` : ""}</p>}
                {<p>{winner && winner === "BOTH" ? `Game Draw` : ""}</p>}
                <div className='grid'>
                    {
                        Array(9).fill(null).map((_, i) => {
                            return <Square winner={winner} key={i} onClick={() => setSquareValue(i)} value={squares[i]}></Square>
                        })
                    }
                </div>
            <button className="reset" onClick={reset}>Start New Game</button>
            </div>
    )
}

export default Board