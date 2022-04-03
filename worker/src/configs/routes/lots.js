const { scheduleController } = require('../../controllers').default

export const lots = {
  get: scheduleController.getLotsFromRemote,
  update: scheduleController.updateLotsToCurrentDate,
  put: scheduleController.createNewScheduleLot
}
