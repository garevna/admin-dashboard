export const sendMessage = function (message) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'send-message',
    message
  })
}
