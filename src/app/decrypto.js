const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]

function decrypto (sentence, key) {
  const phrase = []
  const chars = sentence.toLowerCase().split('')

  for (let i = 0; i < chars.length; i++) {
    let index = alphabet.findIndex(element => element === chars[i])

    var reg = new RegExp(/[a-z]/g)
    var char = reg.exec(chars[i])

    if (!char) {
      var specialChar = chars[i]
      phrase.push(specialChar)
      continue
    }

    const position = index - key
    if (position < 0) {
      var aux = position

      var newPosition = eval(`${alphabet.length} ${aux}`)
      char = chars[i] = alphabet[newPosition]
      phrase.push(char)
      continue
    }

    char = chars[i] = alphabet[position]
    phrase.push(char)
  }

  console.log(phrase.join(''))
  return phrase.join('')
}

module.exports = decrypto
