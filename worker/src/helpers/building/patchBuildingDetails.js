import { patch } from '../AJAX'

export const patchBuildingDetails = async function (id, details) {
  const [route, action] = ['building', 'patch']

  const { status, result } = await patch(`building/${id}`, Object.assign({}, details))
  self.postDebugMessage({ response: { status, result } })
  const response = { status, route, action }
  if (status !== 200) {
    return Object.assign(response, {
      error: true,
      errorType: 'Building details update',
      errorMessage: 'Failed to update building details'
    })
  } else {
    return Object.assign(response, {
      message: true,
      messageType: 'Building details',
      messageText: 'Building details updated'
    })
  }
}
