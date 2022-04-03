const { updatesController } = require('../../controllers').default

export const updates = {
  customers: updatesController.getCustomerUpdates,
  tickets: updatesController.getTicketUpdates,
  schedule: updatesController.getScheduleUpdates,
  get: updatesController.getLastUpdates
}
