export const getSLAContent = function (id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'sla',
    action: 'get',
    key: id
  })
}
