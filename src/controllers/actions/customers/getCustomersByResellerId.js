export const getCustomersByResellerId = function (resellerId) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'customers',
    resellerId
  })
}
