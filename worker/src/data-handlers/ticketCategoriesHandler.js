export const ticketCategoriesHandler = (function () {
  let ticketCategories = []
  return function (data) {
    if (data) ticketCategories = data
    else return ticketCategories
  }
})()
