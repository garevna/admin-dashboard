export const getScheduleError = function (status) {
  return {
    status,
    action: 'get',
    route: 'schedule',
    error: true,
    errorType: 'Schedule',
    errorMessage: 'Failed to get data from local DB'
  }
}
