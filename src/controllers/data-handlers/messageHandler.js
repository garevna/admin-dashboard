export const messageHandler = (function () {
  let messageType = ''
  let messageText = ''
  return function (value) {
    if (!value) return { messageType, messageText }
    messageType = value.messageType
    messageText = value.messageText
  }
})()
