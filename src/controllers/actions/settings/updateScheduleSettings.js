export const updateScheduleSettings = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'settings',
    action: 'update',
    section: 'schedule',
    data
  })
}
