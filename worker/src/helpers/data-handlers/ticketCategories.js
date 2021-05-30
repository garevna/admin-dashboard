export const ticketCategories = (function () {
  let categories = []
  return function (value) {
    if (value) { categories = value } else return categories
  }
})()
