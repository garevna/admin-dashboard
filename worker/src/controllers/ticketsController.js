class TicketsController {
  async refresh (request) {
    self.postMessage(await self.getTicketsFromRemoteServer(request))
  }

  async getCategories () {
    self.postMessage(await self.getCategories())
  }

  async putCategories (data) {
    self.postMessage(await self.putCategories(data))
  }

  async list () {
    self.postMessage(await self.getTicketsFromLocalDb())
  }

  async get (request) {
    self.postMessage(await self.getTicketData(request.key))
  }

  async put (request) {
    self.postMessage(await self.putTicketData(request.id, request.data))
  }

  async post (request) {
    self.postMessage(await self.postNewTicket(request))
  }
}

export const ticketsController = new TicketsController()
