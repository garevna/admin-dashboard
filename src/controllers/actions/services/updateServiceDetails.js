export const updateServiceDetails = function (id, data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'services',
    action: 'put',
    key: id,
    data
  })
}
