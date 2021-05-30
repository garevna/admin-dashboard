export const activateService = function (record) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'schedule',
    action: 'activate',
    request: record
  })
}
