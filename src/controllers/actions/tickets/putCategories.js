export const putCategories = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'tickets',
    action: 'categories',
    data
  })
}
