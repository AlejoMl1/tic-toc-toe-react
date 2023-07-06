import { useState } from "react";
const Cell = ({ id, cells, turn, setCells, setTurn, winningMessage }) => {
  const [turnShape, setTurnShape] = useState("");
  console.log("winning message", winningMessage);
  const handleOnClick = (event) => {
    if (cells[id] == "") {
      if (turn === "Circle") {
        setTurnShape("circle");
        setTurn("Cross");
        handleChangeCellArray("circle");
      } else if (turn === "Cross") {
        setTurnShape("x-shape");
        setTurn("Circle");
        handleChangeCellArray("cross");
      }
    }
  };
  const handleChangeCellArray = (shape) => {
    const newCellsArray = cells.map((cellValue, index) => {
      if (index === id) {
        return shape;
      } else {
        return cellValue;
      }
    });
    setCells(newCellsArray);
  };

  return (
    <div
      className={`square${turnShape ? ` ${turnShape}Active` : ""}`}
      id={id}
      onClick={!winningMessage ? handleOnClick : undefined}
    >
      {<div className={turnShape ? `${turnShape}` : ` ${turn}Hover`}></div>}
    </div>
  );
};

export default Cell;
