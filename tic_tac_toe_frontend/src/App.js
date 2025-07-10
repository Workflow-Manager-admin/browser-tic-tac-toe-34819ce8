import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import GameStatus from './components/GameStatus';

// PUBLIC_INTERFACE
function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isXNext, setIsXNext] = useState(true);
  const current = history[currentStep];

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const newHistory = history.slice(0, currentStep + 1);
    const squares = [...current];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = isXNext ? 'X' : 'O';
    setHistory([...newHistory, squares]);
    setCurrentStep(newHistory.length);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
    setIsXNext(true);
  };

  const winner = calculateWinner(current);
  const isDraw = !winner && current.every(square => square !== null);

  return (
    <div className="App">
      <div className="game-container">
        <h1 className="game-title">Tic Tac Toe</h1>
        <GameStatus 
          winner={winner}
          isXNext={isXNext}
          isDraw={isDraw}
        />
        <Board 
          squares={current}
          onClick={handleClick}
        />
        <button 
          className="reset-button"
          onClick={resetGame}
          aria-label="Reset game"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default App;
