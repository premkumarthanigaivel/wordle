export const KEYBOARD_ALPHABETS = {
  LINE_ONE: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  LINE_TWO: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  LINE_THREE: ["Z", "X", "C", "V", "B", "N", "M"],
}

export const WORD_OF_THE_DAY = [
  "GRIEF",
  "RELIC",
  "GRACE",
  "CHARM",
  "CHORE",
  "SMILE",
  "SWEET",
  "ADEPT",
  "PRIZE",
  "STAND",
]

export const GAME_WON_MESSAGES = [
  "Brilliant 🥳",
  "Magnificient 😎",
  "Splendid 🤟",
  "Awesome 👌",
  "Cool ✌️",
  "Good 🤝",
]

//TODO: remove this
const initSquare = () => ({
  text: "",
  wrongPos: false,
  correctPos: false,
  absent: false,
})

export const INIT_BOARD_STATE = [
  Array.of("", "", "", "", "").map(initSquare),
  Array.of("", "", "", "", "").map(initSquare),
  Array.of("", "", "", "", "").map(initSquare),
  Array.of("", "", "", "", "").map(initSquare),
  Array.of("", "", "", "", "").map(initSquare),
  Array.of("", "", "", "", "").map(initSquare),
]
