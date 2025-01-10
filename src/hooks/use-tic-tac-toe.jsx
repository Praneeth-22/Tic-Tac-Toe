import { useState, useEffect } from "react";
const useTicTacToe = () => {
  const [boardSize, setBoardSize] = useState(9); // default Grid size
  const [board, setBoard] = useState(Array(9).fill(null)); // handle Grid board
  const [isXNext, setIsNext] = useState(true); // To determine who play's
  //Winning pattern of the game
  const WINNING_PATTERNS = [[0, 1, 2]];
  //calculateWinner(): Checks whether someone win
  const calculateWinner = (currBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      if (
        currBoard[a] &&
        currBoard[a] === currBoard[b] &&
        currBoard[a] === currBoard[c]
      )
        return currBoard[a];
    }
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
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
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
