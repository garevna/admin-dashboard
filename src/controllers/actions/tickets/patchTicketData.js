export const patchTicketData = (key, history) => {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'tickets',
    action: 'patch',
    key,
    history
  })
}
