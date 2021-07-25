export const getTickets = function (category) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'tickets',
    action: 'list',
    category
  })
}
