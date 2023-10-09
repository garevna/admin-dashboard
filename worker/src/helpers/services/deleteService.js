import { remove } from '../AJAX'
import { deleteRecordByKey } from '../db'
import { testAccessError } from './testAccessError'

const [route, action] = ['services', 'delete']

export const deleteService = async function (id) {
  if (testAccessError()) return Object.assign({}, testAccessError(), { route, action })

  await remove(`service/${id}`)

  if ((await remove(`service/${id}`)).status !== 200) return self.errorMessage('deleteServiceError')

  if ((await deleteRecordByKey('services', id)).status !== 200) return self.errorMessage('deleteServiceLocalError')

  return {
    status: 200,
    route,
    action,
    message: true,
    messageType: 'Delete service',
    messageText: 'Service removed'
  }
}
