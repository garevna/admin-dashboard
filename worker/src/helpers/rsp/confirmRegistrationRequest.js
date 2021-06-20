import { getRecordByKey } from '../db'
import { put } from '../AJAX'

const { getUserDetailsError, approveRequestError } = require('../error-handlers').default

export const confirmRegistrationRequest = async ({ id }) => {
  const { status: stat, result: request } = await getRecordByKey('rsp', id)

  if (stat !== 200) return getUserDetailsError(stat)

  // self.postMessage({ status: 300, response: { status: stat, result: request } })

  request.userInfo.approved = true

  const { status } = await put(`user/${id}`, request)

  if (status !== 200) return approveRequestError(status)

  return await self.getRegistrationRequests()
}
