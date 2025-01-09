import { useState } from 'react';
const initialBoard = () =>Array(9).fill(null);
const useTicTacToe = () =>{
    const [board, setBoard] = useState(initialBoard);
    const [isXNext,setIsNext] = useState(true);
    const WINNING_PATTERNS =[
        [0,1,2]
    ];
    const calculateWinner = (currBoard) =>{
        for(let i=0;i<WINNING_PATTERNS.length;i++){
            const [a,b,c] = WINNING_PATTERNS[i];
            if( currBoard[a] && currBoard[a] === currBoard[b] && currBoard[a] === currBoard[c]) return currBoard[a];
        }
        return null;
    };
    const handkeClick = (index) =>{
        const winner = calculateWinner(board);
        if(winner || board[index]) return;
        const newBoard =[...board];
        newBoard[index] = isXNext?"X":"O";
        setIsNext(!isXNext);
        setBoard(newBoard);

    };
    const getStatusMessage = ()=>{
        const winner = calculateWinner(board);
        if(winner) return `Player ${winner} wins!`;
        if(!board.includes(null)) return `It's a draw!`;
        return `Player ${isXNext? "X":"O"} turn`;
    };
    const resetGame =()=>{
        setBoard(initialBoard())
        setIsNext(true)
    };
    return {board,calculateWinner,handkeClick,getStatusMessage,resetGame}
};

export default useTicTacToe;