import { remove } from '../AJAX'
import { deleteRecordByKey } from '../db'

const { rejectRequestError } = require('../error-handlers').default

export const rejectRegistrationRequest = async ({ id }) => {
  const { status } = await deleteRecordByKey('rsp', id)

  if (status !== 200) return rejectRequestError(status)

  const response = await remove(`user/${id}`)
  if (response.status !== 200) return rejectRequestError(status)

  return await self.getRegistrationRequests()
}
