import React from "react"
import Confetti from "react-confetti"

const GameWonConfetti = ({ gameWon }) => {
  return (
    gameWon && (
      <Confetti
        numberOfPieces={200}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    )
  )
}

export default GameWonConfetti
