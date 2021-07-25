import { post } from '../AJAX'

const type = 'Create new building'

export const postBuilding = async function (details) {
  const [route, action] = ['building', 'patch']

  self.postDebugMessage({ details })

  const { status, result } = await post('building', details)

  self.postDebugMessage({ response: { status, result } })

  const response = { status, route, action, result }

  if (status !== 200 && status !== 201) {
    return Object.assign(response, {
      error: true,
      errorType: type,
      errorMessage: 'Failed to save building details to remote server'
    })
  } else {
    return Object.assign(response, {
      message: true,
      messageType: type,
      messageText: `Building ${details.address} created`
    })
  }
}
