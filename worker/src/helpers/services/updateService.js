import { getRecordByKey, putRecordByKey } from '../db'
import { put } from '../AJAX'

import { updatedMessage } from './updatedMessage'

import { sendNotification } from '../updates'

export const updateService = async function (id, data) {
  const { status: getStatus, result: getResult } = await getRecordByKey('services', id)

  if (getStatus !== 200) return self.errorMessage('getServiceDetailsError')

  const response = Object.assign({}, getResult, data)

  const { status: putStatus, result: service } = await putRecordByKey('services', id, response)

  if (putStatus !== 200) return self.errorMessage('putServiceDetailsError')

  const { status, result } = await put(`service/${id}`, response)

  if (status !== 200) return self.errorMessage('putServiceDetailsError')

  for (const partnerId of service.partners) {
    await sendNotification(partnerId, 'service', service._id)
  }

  return status !== 200 ? self.errorMessage('putServiceDetailsError') : Object.assign(result, updatedMessage)
}
