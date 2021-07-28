import { post } from '../AJAX'

const type = 'Create new building'

const getError = () => ({
  error: true,
  errorType: type,
  errorMessage: 'Failed to save building details to remote server'
})

const getMessage = address => ({
  message: true,
  messageType: type,
  messageText: `Building ${address} created`
})

export const postBuilding = async function (details) {
  const [route, action] = ['building', 'patch']

  const { status, result } = await post('building', details)

  const response = { status, route, action, result }

  return Object.assign(response, status !== 200 && status !== 201 ? getError() : getMessage(details.address))
}
