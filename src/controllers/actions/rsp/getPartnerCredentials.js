export const getPartnerCredentials = function (resellerId) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'credentials',
    resellerId
  })
}
