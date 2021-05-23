export const updateScheduleRecordStatusError = function () {
  return {
    status: 500,
    action: 'update',
    route: 'schedule',
    error: true,
    errorType: 'Schedule: update service delivery status',
    errorMessage: 'Operation failed: schedule record was not found in local DB'
  }
}
