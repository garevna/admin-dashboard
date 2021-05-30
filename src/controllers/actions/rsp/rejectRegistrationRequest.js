export const rejectRegistrationRequest = function (id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'reject',
    id
  })
}
