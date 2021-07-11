export const getUniqueCodeList = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'get-unique-code-list'
  })
}
