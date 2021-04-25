export const refreshTickets = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'tickets',
    action: 'refresh'
  })
}
