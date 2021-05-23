export const putCategories = function (data) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'categories',
    action: 'put',
    data
  })
}
