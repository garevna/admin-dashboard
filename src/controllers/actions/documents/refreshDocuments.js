export const refreshDocuments = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'documents',
    action: 'refresh'
  })
}
