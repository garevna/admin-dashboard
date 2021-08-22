export const getArchivedTicketDetails = function (id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'tickets',
    action: 'details',
    key: id
  })
}
