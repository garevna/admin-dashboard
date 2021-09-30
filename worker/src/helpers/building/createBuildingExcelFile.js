import { post } from '../AJAX'

const error = () => ({
  error: true,
  errorType: 'Building excel file',
  errorMessage: 'Failed to create building excel file: remote server error'
})

const message = link => ({
  message: true,
  messageType: 'Building excel file created',
  messageText: `<a href="${link}" download> Download </a>`
})

const [route, action] = ['building', 'excel']

export async function createBuildingExcelFile (data) {
  const { status, result } = await post('building/xlsx', data)
  return Object.assign({ route, action, status, result }, status !== 200 ? error() : message(result.data))
}
