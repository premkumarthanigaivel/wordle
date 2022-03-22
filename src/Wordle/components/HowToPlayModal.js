import Dialog from "@mui/material/Dialog"
import { Flex, Square, Container, CloseIcon } from "../styles"

const HowToPlayModal = ({ handleClose, open, darkMode }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <Container darkMode={darkMode}>
        <h3>HOW TO PLAY</h3>

        <CloseIcon onClick={handleClose} darkMode={darkMode} />
        <p>
          Guess the <strong>WORDLE</strong> in six tries
        </p>
        <p>
          Each guess must be a valid five-letter word. Hit the enter button to
          submit
        </p>
        <p>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word
        </p>
        <hr />
        <b>Examples</b>
        <Flex>
          <Square darkMode={darkMode} correctPosition={true}>
            F
          </Square>
          <Square darkMode={darkMode}>A</Square>
          <Square darkMode={darkMode}>I</Square>
          <Square darkMode={darkMode}>T</Square>
          <Square darkMode={darkMode}>H</Square>
        </Flex>
        <p>The letter F is in the word and in the correct spot</p>
        <Flex>
          <Square darkMode={darkMode}>W</Square>
          <Square darkMode={darkMode} wrongPosition={true}>
            O
          </Square>
          <Square darkMode={darkMode}>R</Square>
          <Square darkMode={darkMode}>T</Square>
          <Square darkMode={darkMode}>H</Square>
        </Flex>
        <p>The letter O is in the word but in the wrong spot</p>
        <Flex>
          <Square darkMode={darkMode}>V</Square>
          <Square darkMode={darkMode}>A</Square>
          <Square darkMode={darkMode}>L</Square>
          <Square darkMode={darkMode} absent={true}>
            U
          </Square>
          <Square darkMode={darkMode}>E</Square>
        </Flex>
        <p>The letter U is not in the word in any spot</p>
        <hr />
      </Container>
    </Dialog>
  )
}

export default HowToPlayModal
