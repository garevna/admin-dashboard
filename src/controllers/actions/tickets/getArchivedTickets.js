export const getArchivedTickets = function (year, month) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'tickets',
    action: 'archived',
    year,
    month
  })
}
