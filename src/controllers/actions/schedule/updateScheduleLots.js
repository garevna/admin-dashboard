export const updateScheduleLots = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'lots',
    action: 'update',
    data
  })
}
