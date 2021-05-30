export const confirmRegistrationRequest = function (id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'confirm',
    id
  })
}
