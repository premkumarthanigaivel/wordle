import { useState, Fragment, useEffect, useRef, useCallback } from "react"
import styled, { keyframes, css } from "styled-components"
import { createGlobalStyle } from "styled-components"
import { flipInY } from "react-animations"
import Confetti from "react-confetti"
import Snackbar from "@mui/material/Snackbar"
import * as React from "react"
// import Switch from "@mui/material/Switch"
// import Button from "@mui/material/Button"

/* TODO: 
DARK MODE
RESET GAME
  */

const flipSquareAnimation = keyframes`${flipInY}`

const GlobalCSS = createGlobalStyle`
* {
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
} 


:root{
  --black: #212121;
  --color-tone-1: #ffffff;
  --color-tone-2: #818384;
  --color-tone-3: #565758;
  --color-tone-4: #3a3a3c;
  --darkendYellow: #b59f3b;
  --darkendGreen: #538d4e;
  --color-correct: var(--darkendGreen);
  --color-absent: var(--color-tone-4);
  --color-present: var(--darkendYellow);
  --key-bg: var(--color-tone-2);
  --key-text-color: var(--color-tone-1);
}
`

const Header = styled.header`
  border-bottom: 1px solid var(--color-tone-4);
  width: 100%;
`

const Title = styled.div`
  color: white;
  font-size: 40px;
  font-weight: bolder;
  // letter-spacing: 0.001em;
  text-align: center;
`

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: var(--black);
`

const Board = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(5, 62px);
  gap: 5px 5px;
  @media (max-width: 600px) {
    gap: 4px 4px;
  }
`

const getSquareBGColor = props => {
  if (props?.correctPosition) return "var(--color-correct)"
  else if (props?.wrongPosition) return "var(--color-present)"
  else if (props?.absent) return "var(--color-absent)"
  return "var(--black)"
}

const getSquareBorderColor = props => {
  if (props?.correctPosition) return "var(--color-correct)"
  else if (props?.wrongPosition) return "var(--color-present)"
  else if (props?.absent) return "var(--color-absent)"
  return "var(--color-tone-3)"
}

const Square = styled.div`
  width: 62px;
  height: 62px;
  font-size: 32px;
  background-color: ${props => getSquareBGColor(props)};
  border: 2px solid ${props => getSquareBorderColor(props)};
  color: white;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.6s;
  transform-style: preserver-3d;

  ${props =>
    props.animation &&
    css`
      animation: 2s ${flipSquareAnimation};
    `}
  @media (max-width: 600px) {
    width: 58px;
    height: 58px;
  }
`

const Keyboard = styled.div`
  margin-top: 10px;
  display: flex;
  flex-flow: column nowrap;

  div {
    margin-top: 5px;
  }
`
const Row = styled.div`
  display: flex;
  justify-content: center;
`
const Key = styled.div`
  font-size: 12px;
  padding: 14px;
  height: 58px;
  background-color: var(--key-bg);
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  color: var(--key-text-color);
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 6px;

  @media (max-width: 600px) {
    font-size: 11px;
    padding: 10px;
  }
`

const ToastContent = styled.div`
  border-radius: 3px;
  padding: 10px;
  background-color: white;
  strong {
    font-size: 13px;
  }
`

const KEYBOARD_ALPHABETS = {
  LINE_ONE: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  LINE_TWO: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  LINE_THREE: ["X", "C", "V", "B", "N", "M"],
}

const WORD_OF_THE_DAY = [
  "REPEL",
  "CHARM",
  "GRACE",
  "POISE",
  "GREAT",
  "SPREE",
  "AMAZE",
  "CEASE",
  "WORTH",
  "FAITH",
]
const INIT_BOARD_STATE = [
  Array.of(
    {
      text: "",
      wrongPos: false,
      correctPos: false,
      absent: false,
    },
    {
      text: "",
      wrongPos: false,
      correctPos: false,
      absent: false,
    },
    {
      text: "",
      wrongPos: false,
      correctPos: false,
      absent: false,
    },
    {
      text: "",
      wrongPos: false,
      correctPos: false,
      absent: false,
    },
    {
      text: "",
      wrongPos: false,
      correctPos: false,
      absent: false,
    }
  ),
  Array.of(
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false }
  ),
  Array.of(
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false }
  ),
  Array.of(
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false }
  ),
  Array.of(
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false }
  ),
  Array.of(
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false },
    { text: "", wrongPos: false, correctPos: false, absent: false }
  ),
]

const GAME_WON_MESSAGES = [
  "Brilliant 🥳",
  "Magnificient 😎",
  "Splendid 🤟",
  "Awesome 👌",
  "Cool ✌️",
  "Good 🤝",
]

const isWordInDictionary = async word => {
  const DICTIONARY_API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  const response = await fetch(DICTIONARY_API_URL)
  if (response.status === 200) {
    const output = await response.json()
    return Array.isArray(output)
  } else return false
}

function App() {
  const [wordOftheDay] = useState(
    WORD_OF_THE_DAY[Math.ceil(Math.random() * 10) - 1]
  )
  const [boardState, setBoardState] = useState([INIT_BOARD_STATE])
  const [currentBoardState, setCurrentBoardState] = useState(INIT_BOARD_STATE)
  const [currentMove, setCurrentMove] = useState(1)
  const [gameOver, setGameOver] = useState({ won: false, end: false })
  const [alert, setAlert] = useState({ display: false, msg: "" })

  // Board design
  const renderHeader = () => (
    <Header>
      <Title>WORDLE</Title>
    </Header>
  )

  const renderSquare = () => {
    let squareBoard = []
    currentBoardState.forEach(item =>
      item.forEach(item1 => squareBoard.push(item1))
    )
    return squareBoard.map((letter, idx) => {
      if (typeof letter === "object")
        return (
          <Square
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

  const renderWordleBoard = () => <Board>{renderSquare()}</Board>

  const renderKey = key => (
    <Key key={key} onClick={onLetterKeyClick}>
      {key}
    </Key>
  )
  const renderKeyboard = () => (
    <Keyboard>
      <Row>{KEYBOARD_ALPHABETS.LINE_ONE.map(renderKey)}</Row>
      <Row>{KEYBOARD_ALPHABETS.LINE_TWO.map(renderKey)}</Row>
      <Row>
        <Key onClick={onEnterKeyClick}>ENTER</Key>
        {KEYBOARD_ALPHABETS.LINE_THREE.map(renderKey)}
        <Key onClick={onDeleteKeyClick}>DELETE</Key>
      </Row>
    </Keyboard>
  )

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
    setAlert({ display: false, msg: "" })
  }

  return (
    <Fragment>
      <GlobalCSS />
      <Page>
        {gameOver?.won && (
          <Confetti numberOfPieces={500} width="1440" height="1000" />
        )}
        {renderHeader()}
        {/* <Switch defaultChecked color="default" /> */}
        {/* <Button variant="contained">NEW GAME</Button> */}
        {renderWordleBoard()}
        {renderKeyboard()}
      </Page>
      <Snackbar
        open={alert?.display}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <ToastContent>
          <strong>{alert?.msg}</strong>
        </ToastContent>
      </Snackbar>
    </Fragment>
  )
}

export default App
