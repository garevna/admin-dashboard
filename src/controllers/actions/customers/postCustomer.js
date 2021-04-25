export const postCustomer = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'post',
    data
  })
}
