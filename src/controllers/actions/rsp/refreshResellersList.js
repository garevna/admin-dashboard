export const refreshResellersList = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'refresh'
  })
}
