export const getScheduleWeekData = function (weekNumber) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'schedule',
    action: 'get',
    key: weekNumber
  })
}
