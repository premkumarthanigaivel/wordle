const groupLetterByCount = (prev, curr, idx) => {
  if (curr in prev) {
    prev[curr] = prev[curr] + 1
    return prev
  }
  prev[curr] = 1
  return prev
}

const getRepeatingLetterCount = word => {
  const groupedLetters = Array.from(word).reduce(groupLetterByCount, {})
  return groupedLetters
}

export default getRepeatingLetterCount
