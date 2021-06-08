import { hostHandler, apiKeyHandler } from '../env'

import { encrypt } from '../crypto'

const { resetOffline, resetError, encryptError } = require('../errors').default

export const passwordReset = async (login) => {
  const action = 'reset'

  if (!navigator.onLine) return resetOffline()

  const { status, result: cryptoLogin } = encrypt(JSON.stringify({ login }))

  if (status !== 200) return encryptError()

  const response = await fetch(`${hostHandler()}/pass/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authentification: apiKeyHandler()
    },
    body: JSON.stringify({ login: cryptoLogin })
  })

  const result = await response.json()

  if (response.status !== 200) return resetError(response.status)

  return {
    status: response.status,
    action,
    result
  }
}
