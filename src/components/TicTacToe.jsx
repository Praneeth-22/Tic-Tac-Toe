import React from "react";
import useTicTacToe from "../hooks/use-tic-tac-toe";
import "../App.css";
import { Button, Dropdown } from "antd";
import { useState, useEffect } from "react";

function TicTacToe() {
  const {
    board,
    handleClick,
    getStatusMessage,
    resetGame,
    boardSize,
    setBoardSize,
  } = useTicTacToe(); //initializing useTicTacToe hook
  const gridSize = Math.sqrt(boardSize);
  const items = [
    { label: "3x3", key: "3" },
    { label: "4x4", key: "4" },
    { label: "5x5", key: "5" },
    { label: "6x6", key: "6" },
  ];
  //handleBoardSize(): To dynamically change the Grid size.
  const handleBoardSize = ({ key }) => {
    setBoardSize(key * key);
  };

  return (
    <div
      className="game"
      style={{
        maxWidth: `calc(${gridSize} * 100px)`,
      }}
    >
      <div className="status">{getStatusMessage()}</div>
      <div
        className="board"
        style={{
          maxWidth: `calc(${gridSize} * 100px)`,
          gridTemplateColumns: `repeat(${gridSize},1fr)`,
        }}
      >
        {board.map((b, index) => {
          return (
            <Button
              className="cell"
              key={index}
              onClick={() => handleClick(index)}
              disabled={b !== null}
            >
              {b}
            </Button>
          );
        })}
      </div>
      <div>
        <Button className="reset-button" onClick={resetGame}>
          Reset Game
        </Button>
        <Dropdown
          menu={{
            items,
            onClick: handleBoardSize,
          }}
        >
          <Button>Select Grid Size</Button>
        </Dropdown>
      </div>
    </div>
  );
}

export default TicTacToe;
