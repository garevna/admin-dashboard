export const readLocalDocument = function (file) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'documents',
    action: 'read',
    file
  })
}
