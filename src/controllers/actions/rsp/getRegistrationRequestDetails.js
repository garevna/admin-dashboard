export const getRegistrationRequestDetails = function (id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'registration-request-details',
    id
  })
}
