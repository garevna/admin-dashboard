export const deleteService = function (id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'services',
    action: 'delete',
    key: id
  })
}
