export const createSLA = function (record) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'sla',
    action: 'create',
    record
  })
}
