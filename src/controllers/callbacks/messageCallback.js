export function messageCallback (event) {
  const { messageType, messageText } = event.data
  window[Symbol.for('vue.instance')].$emit('open-message-popup', { messageType, messageText })
}
