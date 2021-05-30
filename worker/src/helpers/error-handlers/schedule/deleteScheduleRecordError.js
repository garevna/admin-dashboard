export const deleteScheduleRecordError = function (status) {
  return {
    status,
    action: 'delete',
    route: 'schedule',
    error: true,
    errorType: 'Schedule',
    errorMessage: 'Failed to delete the data'
  }
}
