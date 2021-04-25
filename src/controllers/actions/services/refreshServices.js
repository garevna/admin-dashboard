export const refreshServices = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'services',
    action: 'refresh'
  })
}
