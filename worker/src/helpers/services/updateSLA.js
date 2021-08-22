import { patch } from '../AJAX'

const [route, action] = ['sla', 'update']

const invalidRequest = {
  status: 422,
  route,
  action,
  error: true,
  errorType: 'SLA update',
  errorMessage: 'Invalid request: insufficient data'
}

export const updateSLA = async (record) => {
  self.postDebugMessage({ record })
  if (!record.id || (!record.title && !record.content)) return invalidRequest

  const success = {
    message: true,
    messageType: 'SLA update',
    messageText: `${record.title || 'SLA'} has been updated`
  }

  const updateSLAFailed = {
    error: true,
    errorType: 'SLA update',
    errorMessage: `Failed to update ${record.title || 'SLA'}`
  }

  const response = await patch(`sla/${record.id}`, record)

  return response.status !== 200 ? Object.assign(response, updateSLAFailed)
    : Object.assign(success, { status: 200, result: response.result.data, route, action })
}
