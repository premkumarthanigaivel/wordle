export const isWordInDictionary = async word => {
  const DICTIONARY_API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  const response = await fetch(DICTIONARY_API_URL)
  if (response.status === 200) {
    const output = await response.json()
    return Array.isArray(output)
  } else return false
}
