export const saveTicketData = (key, response) => {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'tickets',
    action: 'put',
    key,
    response
  })
}
