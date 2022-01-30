import { getRecordByKey, putRecordByKey } from '../db'
import { patch } from '../AJAX'
import { sendNotification } from '../updates'

const [route, action] = ['services', 'patch']

const message = {
  message: true,
  messageType: 'Service details',
  messageText: 'Service details were succesfully updated'
}

const response = { status: 200, route, action }

export const patchService = async function (id, data) {
  const { status, result } = await patch(`service/${id}`, data)

  if (status !== 200) return self.errorMessage('putServiceDetailsError')

  if (data.resellerId) {
    const { resellerId, ...details } = data
    await sendNotification(resellerId, 'service', id, Object.keys(details))
  } else {
    const partners = data.partners ? data.partners : (await getRecordByKey('services', id)).result.partners

    for (const resellerId of partners) await sendNotification(resellerId, 'service', id, Object.keys(data))
  }

  await putRecordByKey('services', id, result.data)

  Object.assign(response, { result })

  return data.resellerId ? Object.assign(response, message) : response
}
