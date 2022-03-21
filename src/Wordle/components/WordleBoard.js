import React from "react"
import { Board, Square } from "../styles"

const WordleBoard = ({ currentBoardState, darkMode }) => {
  const renderSquare = () => {
    let squareBoard = []
    currentBoardState.forEach(item =>
      item.forEach(item1 => squareBoard.push(item1))
    )
    return squareBoard.map((letter, idx) => {
      if (typeof letter === "object")
        return (
          <Square
            darkMode={darkMode}
            key={`${letter.text}_${idx}`}
            wrongPosition={letter.wrongPos}
            correctPosition={letter.correctPos}
            absent={letter.absent}
            animation={letter.animation}
          >
            {letter.text}
          </Square>
        )
      return null
    })
  }

  return <Board>{renderSquare()}</Board>
}

export default WordleBoard
