/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react"
import { Page } from "./styles"
import { WORD_OF_THE_DAY, GAME_WON_MESSAGES, INIT_BOARD_STATE } from "./config"
import generateRandomNumber from "./utils/generateRandomNumber"
import isWordInDictionary from "./utils/isWordInDictionary"
import useKeydownHook from "./utils/useKeydownHook"
import WordleHeader from "./components/WordleHeader"
import WordleBoard from "./components/WordleBoard"
import WordleKeyboard from "./components/WordleKeyboard"
import GameWonConfetti from "./components/GameWonConfetti"
import ToastMessage from "./components/ToastMessage"

const Wordle = () => {
  const [wordOftheDay] = useState(WORD_OF_THE_DAY[generateRandomNumber()])
  const [boardState, setBoardState] = useState([INIT_BOARD_STATE]) // Holds the history of moves
  const [currentBoardState, setCurrentBoardState] = useState(INIT_BOARD_STATE)
  const [currentMove, setCurrentMove] = useState(1)
  const [gameOver, setGameOver] = useState({ won: false, end: false })
  const [alert, setAlert] = useState({ display: false, msg: "" })
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  // Common functions
  const isLastGuessNotCompleted = () => {
    const letterRowPosition = Math.ceil(currentMove / 5) - 1

    const lastRow = currentBoardState
      .slice(letterRowPosition - 1, letterRowPosition)
      .flat()
    return lastRow.filter(letter => letter === "completed").length === 0
  }

  const isLastGuessCompleted = () => {
    const letterRowPosition = Math.ceil(currentMove / 5) - 1

    const lastRow = currentBoardState
      .slice(letterRowPosition - 1, letterRowPosition)
      .flat()
    return lastRow.filter(letter => letter === "completed").length === 1
  }

  // Board Operations
  const onLetterKeyClick = (event, keyboardKey) => {
    // Letter type-in happens either thru ui keyboard/ normal keyboard
    const newLetter = event?.target?.textContent || keyboardKey
    const currentBoard = currentBoardState.slice()
    const letterColPosition = (currentMove % 5) - 1
    const letterRowPosition = Math.ceil(currentMove / 5) - 1

    /*  Don's allow further type-in:
          i) if a row is completed, should not be allow type-in to next row
          ii) Game won - Guess is fully matched with word of the day
          iii) Game over - All six possible guesses are tried 
          */

    if (
      (isLastGuessNotCompleted() && boardState.length > 5) ||
      gameOver.won ||
      gameOver.end
    )
      return

    // Add in new letter to the board
    const updatedBoard = currentBoard.reduce((prev, curr, i) => {
      if (letterRowPosition === i) {
        const newRow = curr.slice()
        newRow.splice(letterColPosition, 1, {
          text: newLetter,
          wrongPos: false,
          correctPos: false,
        })
        return [...prev, newRow]
      } else return [...prev, curr]
    }, [])

    setBoardState([...boardState, updatedBoard])
    setCurrentBoardState(updatedBoard)
    setCurrentMove(prevMove => prevMove + 1)
  }

  const onDeleteKeyClick = () => {
    const letterColPosition = (currentMove % 5) - 1

    /*  Don's allow delete:
          i) if a row is completed, should not be allow type-in to next row
          ii) Game won - Guess is fully matched with word of the day
          iii) Game over - All six possible guesses are tried 
          */

    if (
      (isLastGuessCompleted() && letterColPosition === 0) ||
      boardState.length === 1 ||
      gameOver.won ||
      gameOver.end
    ) {
      return
    }
    // Pick the last two moves, take the former move
    const prevBoard = boardState.slice(-2).splice(0, 1)
    setCurrentBoardState(...prevBoard)
    // Revert to prev board move
    const prevBoardState = boardState
      .slice()
      .filter((item, idx) => idx !== boardState.length - 1)

    setBoardState(prevBoardState)
    setCurrentMove(prevMove => prevMove - 1)
  }

  const onEnterKeyClick = async () => {
    const letterRowPosition = Math.ceil((currentMove - 1) / 5) - 1
    const letterColPosition = (currentMove % 5) - 1
    let currentRow = currentBoardState[letterRowPosition].slice()
    const fullWord = currentRow.reduce(
      (prev, curr) => prev.concat(curr.text),
      ""
    )
    // Game over/won: block enter key
    if (gameOver.won || gameOver.end) {
      return
    }
    // Not 5 letter word
    else if (
      fullWord.length < 5 ||
      (letterColPosition === 0 &&
        letterRowPosition !== 0 &&
        isLastGuessCompleted())
    ) {
      setAlert({ display: "true", msg: "Not enough letters" })
      return
    }
    // Equal to word of the day
    else if (wordOftheDay === fullWord) {
      currentRow = currentRow.map(letter => ({
        ...letter,
        correctPos: true,
        animation: true,
      }))
      setAlert({ display: "true", msg: GAME_WON_MESSAGES[letterRowPosition] })
      setGameOver({ won: true, end: false })
    }
    // Not equal to word of the day - Check in online dictionary
    else if (await isWordInDictionary(fullWord, setLoading)) {
      const WordOfTheDayLetters = wordOftheDay.split("")
      currentRow = currentRow.map((letter, idx) => {
        if (letter.text === WordOfTheDayLetters[idx])
          return { ...letter, correctPos: true, animation: true }
        else if (WordOfTheDayLetters.includes(letter.text))
          //TODO: repeating letter bug
          return { ...letter, wrongPos: true, animation: true }
        return { ...letter, absent: true, animation: true }
      })

      if (letterRowPosition === 5) {
        setAlert({ display: "true", msg: wordOftheDay })
        setGameOver({ won: false, end: true })
      }
    }
    // Not in online dictionary
    else {
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
  }

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return
    setAlert({ displasy: false, msg: "" })
  }

  const handleThemeChange = event => {
    setDarkMode(event.target.checked)
  }

  useKeydownHook(typeInKeyboardKeys)

  return (
    <Page darkMode={darkMode}>
      <GameWonConfetti gameWon={gameOver?.won} />
      <WordleHeader
        loading={loading}
        darkMode={darkMode}
        handleThemeChange={handleThemeChange}
      />
      <WordleBoard currentBoardState={currentBoardState} darkMode={darkMode} />
      <WordleKeyboard
        darkMode={darkMode}
        onLetterKeyClick={onLetterKeyClick}
        onEnterKeyClick={onEnterKeyClick}
        onDeleteKeyClick={onDeleteKeyClick}
      />
      <ToastMessage
        alert={alert}
        handleClose={handleClose}
        darkMode={darkMode}
      />
    </Page>
  )
}

export default Wordle
