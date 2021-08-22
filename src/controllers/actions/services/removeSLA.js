export const removeSLA = function (_id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'sla',
    action: 'remove',
    _id
  })
}
