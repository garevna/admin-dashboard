export const uniqueCodeList = (function () {
  const codes = {}
  return function (id, value) {
    if (!id) return codes
    if (!value) return codes[id]
    else codes[id] = value
  }
})()
