export const refreshPartnersList = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'refresh-partners-list'
  })
}
