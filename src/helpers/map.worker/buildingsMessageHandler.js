export const buildingsMessageHandler = function () {
  window[Symbol.for('map.worker')].addEventListener('message', function (event) {
    if (event.data.message) {
      window[Symbol.for('vue.instance')].$root.$emit('open-message-popup', {
        messageType: event.data.messageType,
        messageText: event.data.messageText
      })
    }
  })
}
