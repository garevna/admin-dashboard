export const postNewTicket = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'tickets',
    action: 'post',
    data
  })
}
