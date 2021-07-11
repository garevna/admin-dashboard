export const confirmRegistrationRequest = function (id, uniqueCode) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'confirm-registration-request',
    data: { id, uniqueCode }
  })
}
