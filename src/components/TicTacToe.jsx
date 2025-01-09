import React from 'react'
import useTicTacToe from '../hooks/use-tic-tac-toe'
import '../App.css'

function TicTacToe() {
    const {board,calculateWinner,handkeClick,getStatusMessage,resetGame} = useTicTacToe();
  return (
    <div className='game'>
    <div className="status">
      {getStatusMessage()}
      <button className='reset-button' onClick={resetGame}>Reset Game</button>
    </div>
    <div className='board'>
        {
          board.map((b,index)=>{
              return (
                <button className='cell' key={index} onClick={()=>handkeClick(index)} disabled = {b!== null}>{b}</button>
              )
          })
        }

    </div>
  </div>
  )
}

export default TicTacToe
