export const hardCustomersRefresh = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'hard-refresh'
  })
}
