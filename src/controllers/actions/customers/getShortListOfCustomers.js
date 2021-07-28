export const getShortListOfCustomers = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'short-list'
  })
}
