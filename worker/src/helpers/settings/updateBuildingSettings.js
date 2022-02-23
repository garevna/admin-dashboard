import { buildingSettingsHandler } from '../../data-handlers'
import { patch } from '../AJAX'

const [route, action, section, title] = ['settings', 'update', 'buildingSettings', 'Settings update']

const error = {
  error: true,
  errorType: title,
  errorMessage: 'Failed to update building settings: remote server error'
}
const message = {
  message: true,
  messageType: title,
  messageText: 'Building settings updated'
}

export const updateBuildingSettings = async ({ buildingClass, buildingType, buildingCategory }) => {
  buildingSettingsHandler({ buildingClass, buildingType, buildingCategory })

  const { status, result } = await patch('settings', { buildingClass, buildingType, buildingCategory })

  const response = { status, route, action, section, result }

  return status !== 200 ? Object.assign(response, error) : Object.assign(response, message)
}
