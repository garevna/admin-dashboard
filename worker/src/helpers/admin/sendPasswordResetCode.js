import { hostHandler, apiKeyHandler, credentialsHandler } from '../env'
import { resetOffline, codeError } from '../errors'

export const sendPasswordResetCode = async (code) => {
  if (!navigator.onLine) return resetOffline()

  const response = await fetch(`${hostHandler()}/pass/approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authentification: apiKeyHandler()
    },
    body: JSON.stringify({ code })
  })

  if (response.status !== 200) codeError(response.status)

  const result = await response.json()

  credentialsHandler(result.data)

  return {
    status: response.status,
    action: 'code'
  }
}
