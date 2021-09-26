import { estimatedServiceDeliveryTimeHandler } from '../../data-handlers'
import { patch } from '../AJAX'

const [route, action, section] = ['settings', 'update', 'estimatedServiceDeliveryTime']
const error = {
  error: true,
  errorType: 'Settings update',
  errorMessage: 'Failed to update estimated service delivery time settings: remote server error'
}
const message = {
  message: true,
  messageType: 'Settings update',
  messageText: 'Estimated service delivery time settings updated'
}

export const updateEstimatedServiceDeliveryTime = async (data) => {
  estimatedServiceDeliveryTimeHandler(data)
  const { status, result } = await patch('settings', { estimatedServiceDeliveryTime: data })

  const response = { status, route, action, section, result }

  return status !== 200 ? Object.assign(response, error) : Object.assign(response, message)
}
