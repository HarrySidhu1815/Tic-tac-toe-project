import Players from "./Components/Players"
import GameBoard from "./Components/GameBoard.jsx"
import { useState } from "react"
import Logs from "./Components/Logs.jsx";
import { WINNING_COMBINATIONS } from "./winning-combination.js";
import GameOver from "./Components/GameOver.jsx";

const PLAYERS = {
  'X' : 'Player 1',
  'O' : 'Player 2'
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurnPlayer) {
  let currentPlayer = 'X';

  if (gameTurnPlayer.length > 0 && gameTurnPlayer[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer
}

function deriveWinner(gameBoard, players){
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSqaure = gameBoard[combination[0].row][combination[0].column];
    const secondSqaure = gameBoard[combination[1].row][combination[1].column];
    const thirdSqaure = gameBoard[combination[2].row][combination[2].column];
   
    if (firstSqaure && firstSqaure === secondSqaure && firstSqaure === thirdSqaure){
      winner = players[firstSqaure];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurn){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurn, setGameTurn] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurn);

  
  let gameBoard = deriveGameBoard(gameTurn);

  const winner = deriveWinner(gameBoard, players);

  console.log(winner);
  const hasDraw = gameTurn.length == 9 && !winner;

  function handleChangeSquare(rowIndex, colIndex) {
    // setActivePlayer((previousPlayer) => previousPlayer === 'X' ? 'O' : 'X')
    setGameTurn((prevTurn) => {

      let currentPlayer = deriveActivePlayer(prevTurn);
      const updatedTurn = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurn];
      return updatedTurn;
    });
  }
  function handleRestart(){
    setGameTurn([]);
  }
  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayer => {
      return({
        ...players,
        [symbol] : newName
      })
    })
  }
  return (
    <>
      <main id="game-container">
        <div>
          <ol id="players" className="highlight-player">
            <Players initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChange={handlePlayerNameChange}/>
            <Players initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChange={handlePlayerNameChange}/>
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
          <GameBoard onSelected={handleChangeSquare} board={gameBoard} />
        </div>
      </main>
      <Logs turns={gameTurn} />
    </>

  )
}

export default App
