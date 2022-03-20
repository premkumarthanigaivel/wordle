import React from "react"
import { Keyboard, Row, Key } from "../styles"
import { KEYBOARD_ALPHABETS } from "../config"

const WordleKeyboard = props => {
  const { onLetterKeyClick, onEnterKeyClick, onDeleteKeyClick } = props

  const renderKey = key => (
    <Key key={key} onClick={onLetterKeyClick}>
      {key}
    </Key>
  )
  return (
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
}

export default WordleKeyboard
