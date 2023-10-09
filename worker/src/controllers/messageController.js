class MessageController {
  async getMessage (request) {
    self.postMessage(await self.getMessageById(request.messageId))
  }

  async getMessages (request) {
    self.postMessage(await self.getMessages())
  }

  async sendMessage (request) {
    self.postMessage(await self.sendMessage(request.message))
  }

  async updateMessage (request) {
    self.postMessage(await self.patchMessage(request.messageId, request.fields))
  }

  async getMessagesByResellerId (request) {
    self.postMessage(await self.getPartnerMessages(request.resellerId))
  }

  async deleteMessage (request) {
    self.postMessage(await self.deleteMessage(request.messageId, request.resellerId))
  }

  async getUpdated (request) {
    self.postMessage(await self.getUpdatedMessages())
  }
}

export const messageController = new MessageController()
