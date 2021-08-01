export const updateScheduleSettings = function (settings) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'schedule',
    action: 'config',
    settings
  })
}
