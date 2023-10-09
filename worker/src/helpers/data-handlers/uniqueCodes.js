export const uniqueCodes = (function () {
  let codes = []
  return function (value) {
    if (!value) return codes
    if (Array.isArray(value)) { codes = value } else codes.push(value)
  }
})()
