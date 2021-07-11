export const updateSLA = function (record) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'sla',
    action: 'put',
    record
  })
}
