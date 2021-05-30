export const getRegistrationRequests = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'registration'
  })
}
