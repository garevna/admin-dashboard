class TicketsController {
  async refresh (request) {
    self.postMessage(await self.getTicketsFromRemoteServer(request))
  }

  async getCategories () {
    self.postMessage(await self.getCategories())
  }

  async putCategories (request) {
    self.postMessage(await self.putCategories(request.data))
  }

  async list () {
    self.postMessage(await self.getTicketsFromLocalDb())
  }

  async get (request) {
    self.postMessage(await self.getTicketData(request.key))
  }

  async put (request) {
    self.postMessage(await self.putTicketData(request.key, request.response))
  }

  async post (request) {
    self.postMessage(await self.postNewTicket(request))
  }
}

export const ticketsController = new TicketsController()
