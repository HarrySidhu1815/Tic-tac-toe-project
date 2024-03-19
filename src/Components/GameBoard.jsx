import React from 'react'

export default function GameBoard ({onSelected, board}) {
    
    // const [gameBoard, setGameBoard] = useState(initialBoard);

    // const handleGameBoard = (rowIndex, colIndex) => {
    //     setGameBoard((previousBoard) => {
    //         const newBoard = [...previousBoard.map((row) => ([...row]))];
    //         newBoard[rowIndex][colIndex] = selectedSymbol;
    //         return newBoard;
    //     })

    //     onSelected();
    // }
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelected(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}

