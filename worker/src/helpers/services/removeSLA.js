import { remove } from '../AJAX'

const [route, action] = ['sla', 'remove']

const invalidRequest = {
  status: 422,
  route,
  action,
  error: true,
  errorType: 'SLA update',
  errorMessage: 'Invalid request: insufficient data'
}

export const removeSLA = async (id) => {
  if (!id) return invalidRequest

  const success = {
    message: true,
    messageType: 'Delete SLA',
    messageText: 'SLA has been removed'
  }

  const removeSLAFailed = {
    error: true,
    errorType: 'Delete SLA',
    errorMessage: 'Failed to remove SLA'
  }

  const response = await remove(`sla/${id}`)

  return response.status !== 200 ? Object.assign(response, removeSLAFailed)
    : Object.assign(success, { status: 200, result: response.result, route, action })
}
