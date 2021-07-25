export const getFilteredShortListOfCustomers = function (filter) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'filtered-short-list',
    filter
  })
}
