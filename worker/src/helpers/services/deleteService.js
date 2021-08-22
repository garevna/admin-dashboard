import { remove } from '../AJAX'
import { deleteRecordByKey } from '../db'

export const deleteService = async function (id) {
  await remove(`service/${id}`)

  if ((await remove(`service/${id}`)).status !== 200) return self.errorMessage('deleteServiceError')

  if ((await deleteRecordByKey('services', id)).status !== 200) return self.errorMessage('deleteServiceLocalError')

  return {
    status: 200,
    route: 'services',
    action: 'delete',
    message: true,
    messageType: 'Delete service',
    messageText: 'Service removed'
  }
}
