export const normalizeAddress = function (address) {
  const index = address.indexOf(', Australia')
  const result = index !== -1 ? address.slice(0, index - address.length) : address
  return result.toUpperCase()
}
