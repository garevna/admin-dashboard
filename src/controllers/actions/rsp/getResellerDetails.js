export const getResellerDetails = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'get',
    data
  })
}
