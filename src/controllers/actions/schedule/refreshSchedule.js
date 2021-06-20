export const refreshSchedule = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'schedule',
    action: 'refresh'
  })
}
