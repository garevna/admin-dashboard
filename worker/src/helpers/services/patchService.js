import { putRecordByKey } from '../db'
import { patch } from '../AJAX'

import { updatedMessage } from './updatedMessage'

export const patchService = async function (id, data) {
  const { status, result } = await patch(`service/${id}`, data)

  if (status !== 200) return self.errorMessage('putServiceDetailsError')

  return Object.assign(await putRecordByKey('services', id, result.data), updatedMessage)
}
