import { remove } from '../AJAX'

const [route, action] = ['building', 'delete']

const error = {
  error: true,
  errorType: 'Delete building',
  errorMessage: 'Failed to delete building'
}

const message = {
  message: true,
  messageType: 'Delete building',
  messageText: 'Building deleted'
}

export const deleteBuilding = async function (id) {
  const { status } = await remove(`building/${id}`)

  const response = { status, route, action }

  return Object.assign(response, status !== 200 ? error : message)
}
