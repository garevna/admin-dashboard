export const updateDocument = function (key, data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'documents',
    action: 'update',
    key,
    data
  })
}
