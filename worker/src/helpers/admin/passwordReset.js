import { hostHandler, apiKeyHandler } from '../env'

import { encrypt } from '../crypto'

const [route, action] = ['admin', 'reset']

export const passwordReset = async (login) => {
  const { status, result: cryptoLogin } = encrypt(JSON.stringify({ login }))

  if (status !== 200) return self.errorMessage('encryptError')

  const response = await fetch(`${hostHandler()}/pass/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authentification: apiKeyHandler()
    },
    body: JSON.stringify({ login: cryptoLogin })
  })

  const result = await response.json()

  if (response.status !== 200) return self.errorMessage('resetError')

  return {
    status: response.status,
    route,
    action,
    result: result.data
  }
}
