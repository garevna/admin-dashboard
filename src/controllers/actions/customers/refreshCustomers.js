export const refreshCustomers = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'pagination'
  })
}
