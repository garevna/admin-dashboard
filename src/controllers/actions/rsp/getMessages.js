export const getMessages = function (resellerId) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'get-messages',
    resellerId
  })
}
