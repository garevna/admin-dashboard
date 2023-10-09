const { scheduleController } = require('../../controllers').default

export const booking = {
  get: scheduleController.getBookingList,
  update: scheduleController.updateRecord
}
