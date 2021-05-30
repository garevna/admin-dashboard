export const updateScheduleRecordError = function (status) {
  return {
    status,
    action: 'update',
    route: 'schedule',
    error: true,
    errorType: 'Schedule',
    errorMessage: 'Failed to update the data'
  }
}
