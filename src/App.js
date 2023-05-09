
import {useState,useEffect} from "react";
import Cell from "./components/Cell";
import "./index.css"
function App() {
    const [cells, setCells] = useState(["","","","","","","","",""]);
    const [turn,setTurn] = useState("player 1");
    const message = `It is ${turn} turn`;
    const [winningMessage, setWinningMessage] = useState(null)
    console.log(cells)
    const [winningLinePosition, setWinningLinePosition] = useState(null);

    const setWinningLine = (winningPosition)=>{
      const sum = winningPosition.reduce((accumulator, curr) => accumulator + curr, 0);
      const xPos = sum / 3 * 100; // Assumes each square is 100px wide
      const yPos = 50; // Position the line vertically in the middle of the row
      setWinningLinePosition({ x: xPos, y: yPos });
    }

    const checkScore =()=>{
        const winningCombos= [
          [0,1,2],[3,4,5],[6,7,8],[0,4,8],[0,3,6],[1,4,7],[2,5,8]
        ]
 
        let foundWinner = false;
     
        winningCombos.forEach(array => {
          const circleWins = array.every(cellIndex => cells[cellIndex]==="circle");
          if (circleWins){
            setWinningMessage("Circle Wins!")
            foundWinner = true;
            setWinningLine(array)
            return;
          }
          const crossWins = array.every(cellIndex => cells[cellIndex]==="cross");
          if (crossWins){
            setWinningMessage("Cross Wins!")
            foundWinner = true;
            setWinningLine(array)
            return;
          }

        });
        return foundWinner;
    }

    useEffect(()=>{
      const check =checkScore();
      console.log(check)
    },[cells])
  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <p>{message}</p>
      <div className="gameBoard">
        {
          cells.map((cell,index)=><Cell 
          key={index} 
          id={index} 
          cells={cells} 
          turn={turn}
          setCells= {setCells}
          setTurn = {setTurn}
          />)
        }
        {winningLinePosition && (
      <div
        className="winning-line"
        
      />
    )}
      </div>
      <p>{winningMessage ? winningMessage:""}</p>
  
    </div>
  );
}

export default App;
