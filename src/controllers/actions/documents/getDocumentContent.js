export const getDocumentContent = function (id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'documents',
    action: 'get',
    key: id
  })
}
