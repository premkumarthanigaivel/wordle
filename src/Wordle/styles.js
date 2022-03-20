import styled from "styled-components"
import { createGlobalStyle, keyframes, css } from "styled-components"
import { flipInY } from "react-animations"

export const flipSquareAnimation = keyframes`${flipInY}`

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
  border-bottom: 1px solid var(--color-tone-4);
  width: 100%;
`

export const Title = styled.div`
  color: white;
  font-size: 40px;
  font-weight: bolder;
  text-align: center;
`

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: var(--black);
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

export const Square = styled.div`
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

export const ToastContent = styled.div`
  border-radius: 3px;
  padding: 12px;
  background-color: white;
  strong {
    font-size: 13px;
  }
`
