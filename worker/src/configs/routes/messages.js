const { messageController } = require('../../controllers').default

export const messages = {
  updated: messageController.getUpdated,
  get: messageController.getMessages,
  partner: messageController.getMessagesByResellerId,
  send: messageController.sendMessage,
  remove: messageController.deleteMessage,
  update: messageController.updateMessage
}
