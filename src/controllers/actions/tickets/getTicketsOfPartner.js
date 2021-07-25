export const getTicketsOfPartner = function (resellerId) {
  console.log('RESELLER ID', resellerId)
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'tickets',
    action: 'rsp',
    resellerId
  })
}
