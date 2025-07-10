import React from 'react';

const GameStatus = ({ winner, isXNext, isDraw }) => {
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Game Draw!";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return <div className="game-status">{status}</div>;
};

export default GameStatus;
