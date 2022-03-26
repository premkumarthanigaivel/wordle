import styled from "styled-components"
import { createGlobalStyle, keyframes, css } from "styled-components"
import { flipInY, rubberBand } from "react-animations"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

const flipSquareAnimation = keyframes`${flipInY}`
const RubberBandAnimation = keyframes`${rubberBand}`

export const GlobalCSS = createGlobalStyle`
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
  --color-tone-5: #edeff1;
  --color-tone-6: #f6f7f8;
  --color-tone-7: #ffffff;
  --darkendYellow: #b59f3b;
  --darkendGreen: #538d4e;
  --color-correct: var(--darkendGreen);
  --color-absent: var(--color-tone-4);
  --color-present: var(--darkendYellow);
  --key-bg: var(--color-tone-2);
  --key-text-color: var(--color-tone-1);

}
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid
    ${props => (props.darkMode ? "var(--color-tone-4)" : "#d3d6da")};
  width: 100%;
`

export const Title = styled.div`
  font-family: "Kaushan Script", cursive;
  font-size: 42px;
  color: ${props => (props.darkMode ? "var(--color-tone-7)" : "var(--black)")};

  font-weight: bolder;
  text-align: center;
  ${props =>
    props.animation &&
    css`
      animation: 3s ${RubberBandAnimation};
    `}
`

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: ${props =>
    props.darkMode ? "var(--black)" : "var(--color-tone-7)"};
  transition: all 0.4s ease-in-out;
`

export const Board = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(5, 62px);
  gap: 5px 5px;
  @media (max-width: 600px) {
    gap: 4px 4px;
  }
`
const getSquareBGColor = props => {
  if (props?.correctPosition)
    return props.darkMode ? "var(--color-correct)" : "#6aaa64"
  else if (props?.wrongPosition)
    return props.darkMode ? "var(--color-present)" : "#c9b458"
  else if (props?.absent)
    return props.darkMode ? "var(--color-absent)" : "#787c7e"
  return props.darkMode ? "var(--black)" : "white"
}

const getSquareBorderColor = props => {
  if (props?.correctPosition)
    return props.darkMode ? "var(--color-correct)" : "#6aaa64"
  else if (props?.wrongPosition)
    return props.darkMode ? "var(--color-present)" : "#c9b458"
  else if (props?.absent)
    return props.darkMode ? "var(--color-absent)" : "#787c7e"
  return props.darkMode ? "var(--color-tone-4)" : "#d3d6da"
}

const getSquareFontColor = props => {
  if (props?.correctPosition || props?.wrongPosition || props?.absent)
    return "white"
  return props?.darkMode ? "white" : "black"
}

export const Square = styled.div`
  width: 62px;
  height: 62px;
  font-size: 32px;

  ${props =>
    props?.gameWon &&
    css`
      background: ${props?.wonColor};
    `}

  background-color: ${props => getSquareBGColor(props)};
  border: 2px solid ${props => getSquareBorderColor(props)};
  ${props =>
    props?.gameWon &&
    css`
      border: 2px solid transparent;
      border-image: linear-gradient(
        to bottom right,
        #b827fc 0%,
        #2c90fc 25%,
        #b8fd33 50%,
        #fec837 75%,
        #fd1892 100%
      );
      border-image-slice: 1;
    `}

  border-radius: 2px;
  color: ${props => getSquareFontColor(props)};
  user-select: none;
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
    width: ${props => (props.modal ? "48px" : "58px")};
    height: ${props => (props.modal ? "48px" : "58px")};
  }
`

export const Keyboard = styled.div`
  margin-top: 10px;
  display: flex;
  flex-flow: column nowrap;

  div {
    margin-top: 5px;
  }
`
export const Row = styled.div`
  display: flex;
  justify-content: center;
`
export const Key = styled.div`
  font-size: 12px;
  width: ${props => (props?.actionKey ? "65px" : "43px")};
  height: 58px;
  background-color: ${props => (props?.darkMode ? "#818384" : "#d3d6da")};
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  color: ${props => (props?.darkMode ? "white" : "black")};
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 6px;

  @media (max-width: 600px) {
    font-size: 11px;
    width: ${props => (props?.actionKey ? "48px" : "30px")};
  }
`

export const ToastContent = styled.div`
  border-radius: 3px;
  padding: 12px;
  background-color: ${props => (props?.darkMode ? "white" : "#333")};
  color: ${props => (props?.darkMode ? "black" : "white")};
  strong {
    font-size: 13px;
  }
`

export const Flex = styled.div`
  display: flex;
  width: 350px;
  justify-content: space-evenly;

  @media (max-width: 600px) {
    width: auto;
  }
`

export const Container = styled.div`
  padding: 10px 20px;
  background-color:${props => (props?.darkMode ? "#fefefe" : "#5c5c5c")};

  h3 {
    text-align: center;
    color: ${props => (props?.darkMode ? "black" : "white")};
    margin-bottom:20px;
  }

  p {
    font-family:'"Clear Sans", "Helvetica Neue"'
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 5px;
    color: ${props => (props?.darkMode ? "black" : "white")};
    line-height: 1.3;
  }
  b {
    display:block;
    margin-top: 10px;
    margin-bottom: 10px;
    color: ${props => (props?.darkMode ? "black" : "white")};
  }
  hr{
    margin-top:10px;
      margin-bottom:10px;
  }

  @media (max-width: 600px) {
    padding: 10px 12px;
  }
`

export const CloseIcon = styled(CloseRoundedIcon)`
  cursor: pointer;
  position: absolute;
  top: 9px;
  right: 5px;
  color: ${props => (props?.darkMode ? "black" : "white")};
`
