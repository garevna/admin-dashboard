export const deleteMessage = function (messageId) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'delete-message',
    messageId
  })
}
