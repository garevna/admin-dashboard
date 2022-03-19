import { post } from '../AJAX'
import { testAccessError } from './testAccessError'

const [route, action] = ['sla', 'create']

const invalidRequest = {
  status: 422,
  route,
  action,
  error: true,
  errorType: 'SLA update',
  errorMessage: 'Invalid request: insufficient data'
}

export const createNewSLA = async (record) => {
  if (testAccessError()) return Object.assign({}, testAccessError(), { route, action })

  if (!record.title || !record.content) return invalidRequest

  const success = {
    message: true,
    messageType: 'Create new SLA',
    messageText: `${record.title || 'SLA'} has been created`
  }

  const createNewSLAFailed = {
    error: true,
    errorType: 'Create new SLA',
    errorMessage: `Failed to create ${record.title || 'SLA'}`
  }

  const response = await post('sla', record)

  return response.status !== 200 ? Object.assign(response, createNewSLAFailed)
    : Object.assign(success, { status: 200, result: response.result.data, route, action })
}
