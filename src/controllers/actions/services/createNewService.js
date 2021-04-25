export const createNewService = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'services',
    action: 'post',
    data
  })
}
