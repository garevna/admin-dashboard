const { scheduleController } = require('../../controllers').default

export const schedule = {
  refresh: scheduleController.refresh,
  get: scheduleController.getFullSchedule,
  week: scheduleController.getByWeekNumber,
  update: scheduleController.updateRecord,
  // settings: scheduleController.getScheduleSettings,
  config: scheduleController.updateScheduleSettings,
  job: scheduleController.putRecordToJobQueue,
  activate: scheduleController.activateService,
  pending: scheduleController.getPendingRequests
}
