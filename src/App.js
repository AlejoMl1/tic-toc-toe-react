import { useState, useEffect } from "react";
import Cell from "./components/Cell";
import "./index.css";
function App() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState("Circle");
  const turnMessage = `${turn} GO!`;
  const [winningMessage, setWinningMessage] = useState(null);
  const [winningLinePosition, setWinningLinePosition] = useState(null);
  const [resetGame, setResetGame] = useState(false);
  const setWinningLine = (winningPosition) => {
    const row = Math.floor(winningPosition[0] / 3); // Row index of the winning position
    const widthSquare = 100; //100 pixel
    const distanceBetweenFirstAndSecond =
      winningPosition[1] - winningPosition[0];
    // console.table(winningPosition)
    const isDiagonalFirstSquare =
      winningPosition[0] === 0 && winningPosition[1] === 4 ? true : false;
    const isDiagonalThirdSquare =
      winningPosition[0] === 2 && winningPosition[1] === 4 ? true : false;
    const isHorizontalLine =
      (row === 0 && winningPosition[1] === 1) ||
      (row === 1 && winningPosition[1] === 4) ||
      (row === 2 && winningPosition[1] === 7)
        ? true
        : false;
    const isVerticalLine =
      row === 0 && distanceBetweenFirstAndSecond === 3 ? true : false;
    switch (true) {
      case isDiagonalFirstSquare:
        setWinningLinePosition({
          width: "3px",
          height: "385px",
          transform: "rotate(-45deg) translateX(-100%) translateY(5%)",
          transformOrigin: "top left",
        });
        break;
      case isDiagonalThirdSquare:
        setWinningLinePosition({
          width: "3px",
          height: "385px",
          transform: "rotate(45deg) translateY(6%)",
          transformOrigin: "top right",
          marginLeft: "300px",
        });
        break;
      case isHorizontalLine:
        setWinningLinePosition({
          width: "290px",
          height: "3px",
          marginTop: `${widthSquare / 2 + row * 100}px`,
          transform: "translateX(2%)",
        });
        break;
      case isVerticalLine:
        const marginLeft = widthSquare * 0.5 + winningPosition[0] * widthSquare;
        setWinningLinePosition({
          transform: "translateY(2%)",
          height: "290px",
          width: "3px",
          marginLeft: `${marginLeft - 2}px`,
        });
        break;
      default:
        // In theory it will never enter this condition
        break;
    }
  };
  const handleNewGame = () => {
    setCells(["", "", "", "", "", "", "", "", ""]);
    //to switch the figure that starts
    if (winningMessage == "Circle Wins!") {
      setTurn("Cross");
    } else {
      setTurn("Circle");
    }
    setWinningLinePosition(null);
    setWinningMessage(null);
    setResetGame(true);
  };
  const checkTie = () => {
    const hasEmptyValue = cells.some((value) => value === "");
    if (!hasEmptyValue) {
      setWinningMessage("Tie!");
      setTurn("");
    }
  };

  const checkScore = () => {
    const handleWinningState = (figure, winningCombos) => {
      let someoneWins = false;
      winningCombos.forEach((winningCombo) => {
        const doesThisFigureWins = winningCombo.every(
          (cellIndex) => cells[cellIndex] === figure
        );
        if (doesThisFigureWins) {
          setWinningLine(winningCombo);
          setWinningMessage(`${figure} wins!`);
          setTurn("");
          someoneWins = true;
        }
      });
      return someoneWins;
    };

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    const doesCircleWin = handleWinningState("circle", winningCombos);
    if (doesCircleWin) {
      return;
    }
    const doesCrossWin = handleWinningState("cross", winningCombos);
    if (doesCrossWin) {
      return;
    }
    checkTie();
  };
  const renderCells = () => {
    return cells.map((cell, index) => (
      <Cell
        key={index}
        id={index}
        cells={cells}
        turn={turn}
        setCells={setCells}
        setTurn={setTurn}
        winningMessage={winningMessage}
      />
    ));
  };

  useEffect(() => {
    checkScore();
    if (!winningMessage && resetGame) {
      setResetGame(false);
    }
  }, [cells]);

  return (
    <div className="app">
      <h1 className="title">TIC TAC TOE</h1>
      <p className={winningMessage ? "winningMessage" : "turnMessage"}>
        {winningMessage ? winningMessage : turnMessage}
      </p>
      <div className="gameBoard">
        {!resetGame ? renderCells() : ""}
        {winningLinePosition && (
          <div className="winning-line" style={winningLinePosition} />
        )}
      </div>
      <button className="button" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
}

export default App;
