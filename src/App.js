
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
      // const sum = winningPosition.reduce((accumulator, curr) => accumulator + curr, 0);
      const row = Math.floor(winningPosition[0] / 3); // Row index of the winning position
      const widthSquare = 100; //100 pixel
      let diagonalWinningLine = false;
      const distanceBetweenFirstAndSecond = winningPosition[1]-winningPosition[0]
      console.table(winningPosition)
      const isDiagonalFirstSquare = (winningPosition[0]===0 && winningPosition[1]===4)?true:false;
      const isDiagonalThirdSquare = (winningPosition[0]===2 && winningPosition[1]===4)?true:false;
      if(isDiagonalFirstSquare){
        setWinningLinePosition({
          width: "3px",
          height:"385px",
          transform: "rotate(-45deg)  translateX(-70.7%) translateY(5%)",
          transformOrigin: "top left",
        })
      }else if(isDiagonalThirdSquare){
        setWinningLinePosition({
          width: "3px",
          height:"385px",
          transform: "rotate(45deg)   translateY(6%)",
          transformOrigin: "top right",
          marginLeft: "300px"
        })
      }
      if (row === 0 && winningPosition[1]===1 || row === 1 && winningPosition[1]===4 || row === 2 && winningPosition[1]===7) {
        // Horizontal line
        setWinningLinePosition({
          width: "290px",
          height:"3px",
          marginTop: `${(widthSquare/2)+(row*100)}px`,
          transform: "translateX(2%)",
        })
      }else if(row === 0 && distanceBetweenFirstAndSecond===3){
        //vertical line
        const marginLeft = (widthSquare*0.5) + (winningPosition[0]*widthSquare);
        setWinningLinePosition({
          transform: "translateY(2%)",
          height: "290px",
          width: "3px",
          marginLeft: `${marginLeft-2}px`
        })
      }
    
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
          [0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]
        ]
 
        let foundWinner = false;
     
        winningCombos.forEach(array => {
          const circleWins = array.every(cellIndex => cells[cellIndex]==="circle");
          if (circleWins){
            console.log("circle wins")
            // setWinningMessage("Circle Wins!")
            foundWinner = true;
            setWinningLine(array)
            return;
          }
          const crossWins = array.every(cellIndex => cells[cellIndex]==="cross");
          if (crossWins){
            console.log("cross wins")
            // setWinningMessage("Cross Wins!")
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
      // console.log("checkScore",check);
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
        style={winningLinePosition}
        
      />
    )}
      </div>
      <p>{winningMessage ? winningMessage:""}</p>
      <button onClick={handleNewGame}></button>
    </div>
  );
}

export default App;
