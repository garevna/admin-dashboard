export const refreshScheduleError = function (status, weekNumber) {
  return {
    status,
    action: 'refresh',
    route: 'schedule',
    error: true,
    errorType: `Schedule: week ${weekNumber}`,
    errorMessage: 'Failed to fetch the data from remote server'
  }
}
