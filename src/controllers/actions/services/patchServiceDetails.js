export const patchServiceDetails = function (id, data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'services',
    action: 'patch',
    key: id,
    data
  })
}
