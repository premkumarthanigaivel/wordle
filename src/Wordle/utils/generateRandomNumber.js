const generateRandomNumber = (endRange = 10) =>
  Math.ceil(Math.random() * endRange) - 1

export default generateRandomNumber
