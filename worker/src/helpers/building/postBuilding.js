import { post } from '../AJAX'

const type = 'Create new building'

const error = () => ({
  error: true,
  errorType: type,
  errorMessage: 'Failed to save building details to remote server'
})

const message = address => ({
  message: true,
  messageType: type,
  messageText: `Building ${address} created`
})

export const postBuilding = async function (details) {
  const [route, action] = ['building', 'post']

  if (!Array.isArray(details.coordinates)) Object.assign(details, { coordinates: [details.coordinates.lng, details.coordinates.lat] })

  const { status, result } = await post('building', details)

  const response = { status: status === 201 ? 200 : status, route, action, result }

  return Object.assign(response, status !== 200 && status !== 201 ? error() : message(details.address))
}
