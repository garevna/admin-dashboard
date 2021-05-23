export const putCategoriesError = function (status) {
  return {
    status,
    route: 'categories',
    action: 'put',
    error: true,
    errorType: 'Ticket categories',
    errorMessage: 'Failed to update data'
  }
}
