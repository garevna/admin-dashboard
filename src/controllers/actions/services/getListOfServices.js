export const getListOfServices = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'services',
    action: 'list'
  })
}
