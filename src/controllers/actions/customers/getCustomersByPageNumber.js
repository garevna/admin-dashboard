export const getCustomersByPageNumber = function (pageNumber) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'pagination',
    pageNumber
  })
}
