
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
      let xPos, yPos
      console.log("distance between",distanceBetweenFirstAndSecond)
      if((winningPosition[0]===0 && winningPosition[1]===4) ||(winningPosition[0]===2 && winningPosition[1]===4) ){
        diagonalWinningLine=true
      }
      if (row === 0 && winningPosition[1]===1 ) {
        //     // Horizontal line
            xPos = widthSquare *0.5;
            yPos = (row + 0.5) * widthSquare;
      }else if(row === 0 && distanceBetweenFirstAndSecond===3){
        console.log("enter vertical luine first row")
        //vertical line
        const transform =  "transform:    translateY(5%);"; 
        const height = "280px";
        const marginLeft = (widthSquare*0.5) + (winningPosition[0]*widthSquare);
        setWinningLinePosition({
          transform: "translateY(2%)",
          height: "290px",
          marginLeft: `${marginLeft-2}px`
        })
      }
      // if(winningPosition[0] <3){ //first row
      //   xPos = ((winningPosition[0]+1) * widthSquare)/2  
      // }else if (winningLinePosition[0] <6){
      //   xPos = ((winningPosition[0]+1) * widthSquare)/2 
      // }
      
      // setWinningLinePosition({ x: xPos, y: yPos });
      // const widthSquare = 100; // 100 pixel
      // let xPos, yPos;
    
      // if (winningPosition.length > 0) {
      //   const row = Math.floor(winningPosition[0] / 3); // Row index of the winning position
      //   const col = winningPosition[0] % 3; // Column index of the winning position
      //   if (row === 0) {
      //     // Horizontal line
      //     xPos = widthSquare / 2;
      //     yPos = (row + 0.5) * widthSquare;
      //   } else if (col === 0) {
      //     // Vertical line
      //     xPos = (col + 0.5) * widthSquare;
      //     yPos = widthSquare / 2;
      //   } else if (row === col) {
      //     // Diagonal line from top-left to bottom-right
      //     xPos = (col + 0.5) * widthSquare;
      //     yPos = (row + 0.5) * widthSquare;
      //   } else if (row + col === 2) {
      //     // Diagonal line from top-right to bottom-left
      //     xPos = (col + 1.5) * widthSquare;
      //     yPos = (row + 0.5) * widthSquare;
      //   }
      // }
    
      // setWinningLinePosition({ x: xPos, y: yPos });
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
