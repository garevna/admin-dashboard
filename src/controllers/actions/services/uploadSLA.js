export const uploadSLA = function (title, file) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'sla',
    action: 'post',
    title,
    file
  })
}
