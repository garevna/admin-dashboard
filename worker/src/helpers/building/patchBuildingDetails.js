import { patch } from '../AJAX'

const message = {
  error: true,
  errorType: 'Building details update',
  errorMessage: 'Failed to update building details'
}

const error = {
  message: true,
  messageType: 'Building details',
  messageText: 'Building details updated'
}

export const patchBuildingDetails = async function (id, details) {
  const [route, action] = ['building', 'patch']

  const { status } = await patch(`building/${id}`, Object.assign({}, details))

  const response = { status, route, action }

  return Object.assign(response, status !== 200 ? error : message)
}
