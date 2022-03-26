const groupLetterByIndex = (prev, curr, idx) => {
  if (curr in prev) {
    prev[curr] = [...prev[curr], idx]
    return prev
  }
  prev[curr] = [idx]
  return prev
}

const filterMoreThanOneInstances = groupedLetters =>
  Object.keys(groupedLetters).reduce(
    (prev, curr) =>
      groupedLetters[curr].length > 1
        ? { ...prev, [curr]: groupedLetters[curr] }
        : prev,
    {}
  )

const getRepeatingLetterCount = word => {
  const groupedLetters = Array.from(word).reduce(groupLetterByIndex, {})
  const repeatingLetters = filterMoreThanOneInstances(groupedLetters)
  return repeatingLetters
}

export default getRepeatingLetterCount
