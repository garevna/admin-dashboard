export const validateMessage = (function () {
  let messageType = ''
  let messageText = ''
  return function (value) {
    if (!value) return false
    if (messageType === value.messageType && messageText === value.messageText) return true
    messageType = value.messageType
    messageText = value.messageText
    return false
  }
})()
