export const patchDocument = function (key, data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'documents',
    action: 'patch',
    key,
    data
  })
}
