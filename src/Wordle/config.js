export const KEYBOARD_ALPHABETS = {
  LINE_ONE: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  LINE_TWO: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  LINE_THREE: ["Z", "X", "C", "V", "B", "N", "M"],
}

export const WORD_OF_THE_DAY = [
  "SHINE",
  "SMART",
  "GRACE",
  "CHARM",
  "GLORY",
  "SMILE",
  "SWEET",
  "ADEPT",
  "PRIZE",
  "STINT",
]

export const GAMEWON_LIGHT_COLORS = [
  "linear-gradient(315deg, #c73e1d 0%, #a23b72 37%, #2e86ab 100%)",
  "linear-gradient(319deg, #d63230 0%, #f39237 37%, #97cc04 100%)",
  "linear-gradient(319deg, #ffbc42 0%, #28965a 37%, #ee6352 100%)",
  "linear-gradient(319deg, #663dff 0%, #aa00ff 37%, #cc4499 100%)",
  "linear-gradient(319deg, #ff1493 0%, #0000ff 37%, #ff8c00 100%)",
  "linear-gradient(319deg, #efd002 0%, #31b74a 37%, #442ce0 100%)",
]

export const GAMEWON_DARK_COLORS = [
  "linear-gradient(319deg, #7fd82b 0%, #ef4063 37%, #e557c6 100%)",
  "linear-gradient(319deg, #118ab2 0%, #06d6a0 37%, #ffd166 100%)",
  "linear-gradient(319deg, #ba2d0b 0%, #fe7f2d 37%, #ffbf46 100%)",
  "linear-gradient(319deg, #91d370 0%, #bca0ff 37%, #f2cd54 100%)",
  "linear-gradient(315deg, #20bf55 0%, #01baef 74%)",
  "linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%)",
]

export const GAME_WON_MESSAGES = [
  "Impressive 🥳",
  "Awesome 🥳",
  "Brilliant 🥳",
  "Genius 🥳",
  "Rockstar 🥳",
  "Great 🥳",
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
