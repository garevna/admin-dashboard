import { putRecordByKey } from '../db'
import { patch } from '../AJAX'
import { sendNotification } from '../updates'

const [route, action] = ['services', 'patch-group']

export const patchServices = async function (partnerId, data) {
  const promises = Object.keys(data).map(key => patch(`service/${key}`, data[key]))

  const responses = await Promise.all(promises)

  const updatedServices = responses.map(response => response.result.data)

  // if (response.status !== 200) return self.errorMessage('putServiceDetailsError')

  for (const service of updatedServices) {
    await putRecordByKey('services', service._id, service)
    await sendNotification(partnerId, 'service', service._id, ['partners'])
  }

  return {
    status: 200,
    route,
    action,
    result: updatedServices,
    message: true,
    messageType: 'Parner services',
    messageText: 'Parner services were succesfully updated'
  }
}
