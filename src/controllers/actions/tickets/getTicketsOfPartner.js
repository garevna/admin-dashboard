export const getTicketsOfPartner = function (resellerId) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'tickets',
    action: 'rsp',
    resellerId
  })
}
