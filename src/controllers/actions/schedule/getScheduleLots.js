export const getScheduleLots = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'lots',
    action: 'get'
  })
}
