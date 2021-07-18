import { put } from '../AJAX'

const [route, action] = ['sla', 'update']

const invalidRequest = {
  status: 422,
  route,
  action,
  error: true,
  errorType: 'SLA update',
  errorMessage: 'Invalid or insufficient data in request'
}

export const updateSLA = async (record) => {
  self.postDebugMessage(record)

  if (!record.id || !record.title || !record.content) return invalidRequest

  const success = {
    message: true,
    messageType: 'SLA update',
    messageText: `${record.title} has been updated`
  }

  const updateSLAFailed = {
    error: true,
    errorType: 'SLA update',
    errorMessage: `Update for ${record.title} failed`
  }

  const response = await put(`sla/${record._id}`, record)

  self.postDebugMessage({ response })

  return response.status !== 200 ? Object.assign(response, updateSLAFailed)
    : Object.assign(success, { status: 200, result: response.result.data, route, action })
}
