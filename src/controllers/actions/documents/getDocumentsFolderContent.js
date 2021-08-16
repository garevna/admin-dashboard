export const getDocumentsFolderContent = function (folder) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'documents',
    action: 'dir',
    folder
  })
}
