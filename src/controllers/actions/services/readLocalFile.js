export const readLocalFile = function (file) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'sla',
    action: 'read',
    file
  })
}
