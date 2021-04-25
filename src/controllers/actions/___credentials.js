export const credentials = function () {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'rsp',
    action: 'credentials'
  })
}
