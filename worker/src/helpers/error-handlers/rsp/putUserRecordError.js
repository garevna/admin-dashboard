export const putUserRecordError = function (status) {
  return {
    status,
    action: 'put',
    route: 'rsp',
    error: true,
    errorType: 'RSP details',
    errorMessage: 'Failed to save data to local DB'
  }
}
