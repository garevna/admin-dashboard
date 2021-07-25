export const saveTicketData = (ticket) => {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'tickets',
    action: 'put',
    ticket
  })
}
