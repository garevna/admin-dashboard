export const getScheduleSettings = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'settings',
    action: 'get',
    section: 'schedule'
  })
}
