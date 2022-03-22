import React from "react"
import { Header, Title } from "../styles"
import Switch from "@mui/material/Switch"
import HelpIcon from "@mui/icons-material/Help"

const WordleHeader = ({
  loading,
  darkMode,
  handleThemeChange,
  handleHelpIconClick,
}) => {
  return (
    <Header darkMode={darkMode}>
      <HelpIcon
        onClick={handleHelpIconClick}
        style={{
          marginLeft: "10px",
          color: darkMode ? "white" : "black",
          cursor: "pointer",
        }}
        fontSize="medium"
      />
      <Title animation={loading} darkMode={darkMode}>
        WORDLE
      </Title>
      <Switch checked={darkMode} onChange={handleThemeChange} />
    </Header>
  )
}

export default WordleHeader
