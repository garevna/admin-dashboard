export const getDocumentsList = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'documents',
    action: 'list'
  })
}
