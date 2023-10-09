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

  async list (request) {
    self.postMessage(await self.getTicketsFromLocalDb(request.category))
  }

  async pending () {
    self.postMessage(await self.getPendingTickets())
  }

  async archived (request) {
    self.postMessage(await self.getArchivedTicketsFromRemoteServer(request.year, request.month))
  }

  async listForPartner (request) {
    self.postMessage(await self.getTicketsByRSP(request.resellerId))
  }

  async get (request) {
    self.postMessage(await self.getTicketData(request.key))
  }

  async getArchivedTicketDetails (request) {
    self.postMessage(await self.getArchivedTicketDetails(request.key))
  }

  async put (request) {
    self.postMessage(await self.putTicketData(request.ticket))
  }
}

export const ticketsController = new TicketsController()
