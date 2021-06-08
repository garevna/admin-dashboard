import { secretHandler } from '../env'
import { emptyData, secretError, encryptError } from '../../configs'

const crypto = require('crypto-js')

export const encrypt = (data) => {
  const action = 'encrypt'
  if (!data) {
    return {
      status: 422,
      route: 'encrypt',
      action,
      error: true,
      errorType: 'Crypto',
      result: emptyData
    }
  }

  if (!secretHandler()) {
    return {
      status: 500,
      route: 'encrypt',
      action,
      error: true,
      errorType: 'Crypto',
      result: secretError
    }
  }

  const result = crypto.AES.encrypt(data, secretHandler()).toString()

  return result ? { status: 200, action, result } : { status: 500, action, result: encryptError }
}
