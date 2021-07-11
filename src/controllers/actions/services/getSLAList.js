export const getSLAList = function (id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'sla',
    action: 'list'
  })
}
