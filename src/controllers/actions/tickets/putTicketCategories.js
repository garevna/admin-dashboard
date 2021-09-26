export const putTicketCategories = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'settings',
    action: 'update',
    section: 'ticketCategories',
    data
  })
}
