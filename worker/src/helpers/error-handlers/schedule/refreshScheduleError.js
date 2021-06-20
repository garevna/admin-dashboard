export const refreshScheduleError = function (status) {
  return {
    status,
    action: 'refresh',
    route: 'schedule',
    error: true,
    errorType: 'Schedule',
    errorMessage: 'Failed to fetch the data from remote server'
  }
}
