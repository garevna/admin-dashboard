export const getTicketCategories = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'settings',
    action: 'get',
    section: 'ticketCategories'
  })
}
