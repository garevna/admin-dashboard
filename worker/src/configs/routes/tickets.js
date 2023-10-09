const { ticketsController } = require('../../controllers').default

export const tickets = {
  refresh: ticketsController.refresh,
  list: ticketsController.list,
  pending: ticketsController.pending,
  archived: ticketsController.archived,
  details: ticketsController.getArchivedTicketDetails,
  rsp: ticketsController.listForPartner,
  get: ticketsController.get,
  put: ticketsController.put
}
