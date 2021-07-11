export const refreshRegistrationRequests = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'refresh-registration-requests'
  })
}
