function removeVowels (string) {
  string = string.split(' ').join('')
  for (const vowel of 'aeiouyAEIOUY'.split('')) {
    string = string[0] + string.slice(1).split(vowel).join('')
  }
  return string.toUpperCase()
}

export const getBuildingUniqueCode = function (addressComponents) {
  if (!addressComponents) return ''
  const { number, postCode, street, streetType } = addressComponents
  return `PA.${postCode}.${removeVowels(street)}.${streetType}.${number}`
}
