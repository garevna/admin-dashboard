export const getServiceDetails = function (id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'services',
    action: 'get',
    key: id
  })
}
