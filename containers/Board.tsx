import { useState } from "react"
import Square from "../components/Square";

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState('X'); // first player is default
    const [winner, setWinner] = useState(null);

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

    return (
        <div>
            <p>By default X goes first!</p>
            <div className='grid'>
            {
                Array(9).fill(null).map((_, i) => {
                    return <Square winner={winner} key={i} onClick={() => setSquareValue(i)} value={squares[i]}></Square>
                })
            }
            </div>
        </div>
    )
}

export default Board