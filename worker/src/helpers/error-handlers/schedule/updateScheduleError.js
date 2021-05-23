export const updateScheduleError = function (status) {
  return {
    status,
    action: 'update',
    route: 'schedule',
    error: true,
    errorType: 'Schedule',
    errorMessage: 'Failed to save data'
  }
}
