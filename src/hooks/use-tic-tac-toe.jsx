import { useState, useEffect } from "react";
const useTicTacToe = () => {
  const [boardSize, setBoardSize] = useState(9); // default Grid size
  const [board, setBoard] = useState(Array(9).fill(null)); // handle Grid board
  const [isXNext, setIsNext] = useState(true); // To determine who play's

  //calculateWinner(): Checks whether someone win
  const calculateWinner = (currBoard, boardSize) => {
    const n = Math.sqrt(boardSize);

    // Check rows
    for (let row = 0; row < n; row++) {
      const start = row * n;
      const rowPattern = currBoard.slice(start, start + n);
      if (rowPattern.every((cell) => cell && cell === rowPattern[0])) {
        return rowPattern[0];
      }
    }

    // Check columns
    for (let col = 0; col < n; col++) {
      const colPattern = [];
      for (let row = 0; row < n; row++) {
        colPattern.push(currBoard[row * n + col]);
      }
      if (colPattern.every((cell) => cell && cell === colPattern[0])) {
        return colPattern[0];
      }
    }

    // Check main diagonal
    const mainDiagonal = [];
    for (let i = 0; i < n; i++) {
      mainDiagonal.push(currBoard[i * n + i]);
    }
    if (mainDiagonal.every((cell) => cell && cell === mainDiagonal[0])) {
      return mainDiagonal[0];
    }

    // Check anti-diagonal
    const antiDiagonal = [];
    for (let i = 0; i < n; i++) {
      antiDiagonal.push(currBoard[i * n + (n - 1 - i)]);
    }
    if (antiDiagonal.every((cell) => cell && cell === antiDiagonal[0])) {
      return antiDiagonal[0];
    }

    // No winner found
    return null;
  };
  //handleClick(): Determine the turn of the player
  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setIsNext(!isXNext);
    setBoard(newBoard);
  };
  //getStatusMessage(): Updates the win status
  const getStatusMessage = () => {
    const winner = calculateWinner(board, boardSize);
    if (winner) {
      setTimeout(() => {
        resetGame();
      }, 5000);
      return `Player ${winner} wins! Resetting in 5 seconds...`;
    }
    if (!board.includes(null)) {
      // Start a timeout to reset the game after 5 seconds
      setTimeout(() => {
        resetGame();
      }, 5000);
      return `It's a draw! Resetting in 5 seconds...`;
    }

    return `Player ${isXNext ? "X" : "O"} turn`;
  };
  //resetGame(): reset the Board
  const resetGame = () => {
    setBoard(Array(boardSize).fill(null));
    setIsNext(true);
  };
  //useEffect to dynamically update the board
  useEffect(() => {
    setBoard(Array(boardSize).fill(null));
    setIsNext(true);
  }, [boardSize]);
  return {
    board,
    handleClick,
    getStatusMessage,
    resetGame,
    boardSize,
    setBoardSize,
  };
};

export default useTicTacToe;
