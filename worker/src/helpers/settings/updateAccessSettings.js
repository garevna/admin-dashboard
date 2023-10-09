import { accessSettingsHandler } from '../../data-handlers'
import { patch } from '../AJAX'

const [route, action, section, title] = ['settings', 'update', 'accessSettings', 'Settings update']

const error = {
  error: true,
  errorType: title,
  errorMessage: 'Failed to update settings: remote server error'
}
const message = {
  message: true,
  messageType: title,
  messageText: 'Access rights updated'
}

export const updateAccessSettings = async ({ access, roles }) => {
  accessSettingsHandler({ access, roles })

  const { status, result } = await patch('settings', { access, roles })

  const response = { status, route, action, section, result }

  return status !== 200 ? Object.assign(response, error) : Object.assign(response, message)
}
