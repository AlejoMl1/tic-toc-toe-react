import { useState } from "react";
const Cell = ({ id, cells, turn, setCells, setTurn,winningMessage }) => {
    const [turnShape, setTurnShape] = useState("");
    const handleOnClick = (event) => {
        if (cells[id] == "") {
            if (turn === "player 1") {
                setTurnShape("circle")
                setTurn("player 2")
                handleChangeCellArray("circle")
              
            } else if (turn === "player 2") {
                setTurnShape("x-shape")
                setTurn("player 1")
                handleChangeCellArray("cross")
            }
        }

    }
    const handleChangeCellArray = (shape) => {

        const newCellsArray = cells.map((cellValue, index) => {
            if (index === id) {
                return shape;
            } else {
                return cellValue;
            }
        })
        setCells(newCellsArray)
    }

   
    return (
        <div className={`square${turnShape?` ${turnShape}Active`:""}`} id={id} onClick={ !winningMessage ? handleOnClick:undefined}>
            {
                turnShape? (  <div className={turnShape}></div>):undefined
            }
          
        </div>
    )
}

export default Cell;