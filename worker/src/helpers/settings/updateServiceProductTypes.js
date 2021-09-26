import { serviceProductTypesHandler } from '../../data-handlers'
import { patch } from '../AJAX'

const [route, action, section] = ['settings', 'update', 'serviceProductTypes']
const error = {
  error: true,
  errorType: 'Settings update',
  errorMessage: 'Failed to update service product types: remote server error'
}
const message = {
  message: true,
  messageType: 'Settings update',
  messageText: 'Service product types updated'
}

export const updateServiceProductTypes = async (data) => {
  serviceProductTypesHandler(data)
  const { status, result } = await patch('settings', { serviceProductTypes: data })

  const response = { status, route, action, section, result }

  return status !== 200 ? Object.assign(response, error) : Object.assign(response, message)
}
