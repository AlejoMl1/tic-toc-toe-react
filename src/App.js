
import {useState,useEffect} from "react";
import Cell from "./components/Cell";
import "./index.css"
function App() {
    const [cells, setCells] = useState(["","","","","","","","",""]);
    const [turn,setTurn] = useState("player 1");
    const message = `It is ${turn} turn`;
    const [winningMessage, setWinningMessage] = useState(null)
    // console.log(cells)
    const [winningLinePosition, setWinningLinePosition] = useState(null);
    const [resetGame,setResetGame]= useState(false)

    const setWinningLine = (winningPosition)=>{
      const sum = winningPosition.reduce((accumulator, curr) => accumulator + curr, 0);
      const xPos = sum / 3 * 100; // Assumes each square is 100px wide
      const yPos = 50; // Position the line vertically in the middle of the row
      setWinningLinePosition({ x: xPos, y: yPos });
    }
    const handleNewGame = ()=>{
    setCells(["","","","","","","","",""]);
    setTurn("player 1");
    setWinningLinePosition(null);
    setWinningMessage(null);
    setResetGame(true);

    }
    const checkScore =()=>{
        const winningCombos= [
          [0,1,2],[3,4,5],[6,7,8],[0,4,8],[0,3,6],[1,4,7],[2,5,8]
        ]
 
        let foundWinner = false;
     
        winningCombos.forEach(array => {
          const circleWins = array.every(cellIndex => cells[cellIndex]==="circle");
          if (circleWins){
            console.log("circle wins")
            setWinningMessage("Circle Wins!")
            foundWinner = true;
            setWinningLine(array)
            return;
          }
          const crossWins = array.every(cellIndex => cells[cellIndex]==="cross");
          if (crossWins){
            console.log("cross wins")
            setWinningMessage("Cross Wins!")
            foundWinner = true;
            setWinningLine(array)
            return;
          }

        });
        return foundWinner;
    }
    const renderCells = ()=>{
      return cells.map((cell,index)=><Cell 
          key={index} 
          id={index} 
          cells={cells} 
          turn={turn}
          setCells= {setCells}
          setTurn = {setTurn}
          winningMessage= {winningMessage}
          />)
    }
    useEffect(()=>{
      const check =checkScore();
      console.log("checkScore",check);
      if(!winningMessage && resetGame){
        setResetGame(false);
      }

    },[cells])
  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <p>{message}</p>
      <div className="gameBoard">
        {
          !resetGame? renderCells():""

        }
        {winningLinePosition && (
      <div
        className="winning-line"
        
      />
    )}
      </div>
      <p>{winningMessage ? winningMessage:""}</p>
      <button onClick={handleNewGame}></button>
    </div>
  );
}

export default App;
