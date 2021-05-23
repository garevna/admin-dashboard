export const buildingsListPageNumberHandler = (function (value) {
  let pageNumber = 1
  return function (value) {
    if (!value || typeof value !== 'number') {
      return pageNumber
    } else {
      pageNumber = value
    }
  }
})()
