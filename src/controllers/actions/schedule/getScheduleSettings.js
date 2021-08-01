export const getScheduleSettings = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'schedule',
    action: 'settings'
  })
}
