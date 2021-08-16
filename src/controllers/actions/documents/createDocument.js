export const createDocument = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'documents',
    action: 'post',
    data
  })
}
