export const getCategories = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'categories',
    action: 'get'
  })
}
