export const getResellersList = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'list'
  })
}
