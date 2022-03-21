import React from "react"
import { Header, Title } from "../styles"

const WordleHeader = ({ loading }) => {
  return (
    <Header>
      <Title animation={loading}>WORDLE</Title>
    </Header>
  )
}

export default WordleHeader
