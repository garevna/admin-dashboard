export const putScheduleRecordError = function (status) {
  return {
    status,
    action: 'put',
    route: 'schedule',
    error: true,
    errorType: 'Schedule',
    errorMessage: 'Unable to store the schedule record in local DB'
  }
}
