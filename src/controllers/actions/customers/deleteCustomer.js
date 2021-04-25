export const deleteCustomer = function (id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'delete',
    key: id
  })
}
