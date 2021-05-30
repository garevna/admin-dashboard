export const customersListPageNumberHandler = (function () {
  let page = 1
  return function (value) {
    if (!value || typeof value !== 'number') return page
    else {
      page = value
    }
  }
})()
