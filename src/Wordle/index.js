import React, { useState, useEffect, useCallback } from "react"
import { Page } from "./styles"
import { WORD_OF_THE_DAY, GAME_WON_MESSAGES, INIT_BOARD_STATE } from "./config"
import { generateRandomNumber } from "./utils/generateRandomNumber"
import { isWordInDictionary } from "./utils/isWordInDictionary"
import WordleHeader from "./components/WordleHeader"
import WordleBoard from "./components/WordleBoard"
import WordleKeyboard from "./components/WordleKeyboard"
import GameWonConfetti from "./components/GameWonConfetti"
import ToastMessage from "./components/ToastMessage"

const Wordle = () => {
  const [wordOftheDay] = useState(WORD_OF_THE_DAY[generateRandomNumber()])
  const [boardState, setBoardState] = useState([INIT_BOARD_STATE])
  const [currentBoardState, setCurrentBoardState] = useState(INIT_BOARD_STATE)
  const [currentMove, setCurrentMove] = useState(1)
  const [gameOver, setGameOver] = useState({ won: false, end: false })
  const [alert, setAlert] = useState({ display: false, msg: "" })

  // Board Operations
  const onLetterKeyClick = useCallback(
    (event, keyboardKey) => {
      const letterRowPosition = Math.ceil(currentMove / 5) - 1
      let isLastGuessCompleted =
        currentBoardState
          .slice(letterRowPosition - 1, letterRowPosition)
          .flat()
          .filter(letter => letter === "completed").length === 0

      if (
        (isLastGuessCompleted && boardState.length > 5) ||
        gameOver.won ||
        gameOver.end
      )
        return

      const newLetter = event?.target?.textContent || keyboardKey
      const currentBoard = currentBoardState.slice()
      const letterColPosition = (currentMove % 5) - 1
      const newBoard = []

      currentBoard.forEach((row, i) => {
        if (letterRowPosition === i) {
          const newRow = row.slice()
          newRow.splice(letterColPosition, 1, {
            text: newLetter,
            wrongPos: false,
            correctPos: false,
          })
          newBoard.push(newRow)
        } else newBoard.push(row)
      })
      setBoardState([...boardState, newBoard])
      setCurrentBoardState(newBoard)
      setCurrentMove(prevMove => prevMove + 1)
    },
    [boardState, gameOver, currentBoardState, currentMove]
  )

  const onDeleteKeyClick = useCallback(() => {
    const letterColPosition = (currentMove % 5) - 1
    const letterRowPosition = Math.ceil(currentMove / 5) - 1

    let isCurrentBoardCompletedArr = currentBoardState
      .slice(letterRowPosition - 1, letterRowPosition)
      .flat()
      .filter(letter => letter === "completed")

    let isLastBoardCompleted = isCurrentBoardCompletedArr.length === 1
    //delete last letter
    if (
      (isLastBoardCompleted && letterColPosition === 0) ||
      boardState.length === 1 ||
      gameOver.won ||
      gameOver.end
    ) {
      return
    }

    const prevBoard =
      boardState.length >= 1
        ? boardState.slice(-2).splice(0, 1) // picking the last two board states, and taking the first one
        : boardState.slice(0, 1) // revert to first move , empty array
    setCurrentBoardState(...prevBoard)
    //revert to prev board state
    const prevBoardState = boardState
      .slice()
      .filter((item, idx) => idx !== boardState.length - 1)

    setBoardState(prevBoardState)
    setCurrentMove(prevMove => prevMove - 1)
  }, [boardState, gameOver, currentBoardState, currentMove])

  const onEnterKeyClick = useCallback(async () => {
    const letterRowPosition = Math.ceil((currentMove - 1) / 5) - 1
    let currentRow = currentBoardState[letterRowPosition].slice()
    const fullWord = currentRow.reduce((prev, curr) => {
      return prev.concat(curr.text)
    }, "")

    if (gameOver.won || gameOver.end) {
      return
    } else if (fullWord.length < 5) {
      setAlert({ display: "true", msg: "Not enough letters" })
      return
    } else if (wordOftheDay === fullWord) {
      currentRow = currentRow.map(letter => ({
        ...letter,
        correctPos: true,
        animation: true,
      }))
      setAlert({ display: "true", msg: GAME_WON_MESSAGES[letterRowPosition] })
      setGameOver({ won: true, end: false })
    } else if (await isWordInDictionary(fullWord)) {
      const WordOfTheDayLetters = wordOftheDay.split("")
      currentRow = currentRow.map((letter, idx) => {
        if (letter.text === WordOfTheDayLetters[idx])
          return { ...letter, correctPos: true, animation: true }
        else if (WordOfTheDayLetters.includes(letter.text))
          return { ...letter, wrongPos: true, animation: true }
        return { ...letter, absent: true, animation: true }
      })
      if (letterRowPosition === 5) {
        setAlert({ display: "true", msg: wordOftheDay })
        setGameOver({ won: false, end: true })
      }
    } else {
      setAlert({ display: "true", msg: "Not in the dictionary" })
      return
    }
    let updatedBoardState = currentBoardState.slice()
    updatedBoardState.splice(letterRowPosition, 1, [...currentRow, "completed"])
    setCurrentBoardState(updatedBoardState)

    const updatedState = [
      ...boardState.slice(0, boardState.length - 1),
      updatedBoardState,
    ]
    setBoardState(updatedState)
  }, [boardState, gameOver, currentBoardState, currentMove, wordOftheDay])

  const typeInKeyboardKeys = useCallback(
    event => {
      const keyboardKey = event.key
      if (/^[a-zA-Z]{1}$/.test(keyboardKey))
        onLetterKeyClick(null, keyboardKey?.toUpperCase())
      else if (keyboardKey === "Enter") onEnterKeyClick()
      else if (keyboardKey === "Backspace") onDeleteKeyClick()
    },
    [onLetterKeyClick, onEnterKeyClick, onDeleteKeyClick]
  )

  useEffect(() => {
    window.addEventListener("keydown", typeInKeyboardKeys)
    return () => {
      window.removeEventListener("keydown", typeInKeyboardKeys)
    }
  }, [typeInKeyboardKeys])

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return
    setAlert({ displasy: false, msg: "" })
  }

  return (
    <Page>
      <GameWonConfetti gameWon={gameOver?.won} />
      <WordleHeader />
      <WordleBoard currentBoardState={currentBoardState} />
      <WordleKeyboard
        onLetterKeyClick={onLetterKeyClick}
        onEnterKeyClick={onEnterKeyClick}
        onDeleteKeyClick={onDeleteKeyClick}
      />
      <ToastMessage alert={alert} handleClose={handleClose} />
    </Page>
  )
}

export default Wordle
