import { post, patch } from '../AJAX'
import { idHandler } from '../env'
import { putRecordByKey } from '../db'

import { encrypt, hash } from '../crypto'

import { invalidRequest, createPartnerError } from '../../errors'

const [route, action] = ['rsp', 'create']

const error = { route, action, error: true, errorType: 'Partner creation' }

const duplicationError = Object.assign({}, error, {
  status: 409,
  errorMessage: 'User login already in use'
})

export const createPartner = async function (data) {
  const { login, password, phoneNumber, userName = 'partner', ...details } = data

  if (!login || !password || !phoneNumber) return invalidRequest()

  const { result: hashPassword } = hash(password)

  const { result: auth } = encrypt(JSON.stringify({ login, phoneNumber, userName, password: hashPassword }))

  Object.assign(details, { auth })

  const { status, result } = await post('registration', details)

  self.postDebugMessage({ response: { status, result } })

  if (result.error === 'A user with this login already exists.') return duplicationError

  idHandler(result.data._id)

  await patch(`user/${result.data._id}`, { approved: true })

  const response = await putRecordByKey('rsp', idHandler(), Object.assign(result.data, { approved: true }))
  if (response.status !== 200) return createPartnerError(response.status)

  return {
    status,
    route,
    action,
    result: result.data,
    message: true,
    messageType: 'DGtek partner creation',
    messageText: `Partner ${data.company.name} created`
  }
}
