export const getDocumentFolders = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'documents',
    action: 'folders'
  })
}
