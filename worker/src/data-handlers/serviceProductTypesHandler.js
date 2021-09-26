export const serviceProductTypesHandler = (function () {
  let types = []
  return function (data) {
    if (data) types = data
    else return types
  }
})()
