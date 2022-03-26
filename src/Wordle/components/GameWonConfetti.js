import React from "react"
import Confetti from "react-confetti"

const GameWonConfetti = ({ gameWon }) => {
  return (
    gameWon && (
      <Confetti
        numberOfPieces={300}
        friction={0.988}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    )
  )
}

export default GameWonConfetti
