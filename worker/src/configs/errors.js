const emptyData = 'Invalid request: source data empty'
const secretError = 'Error reading secrets'
const encryptError = 'Error encrypting the data'
const decryptError = 'Error decrypting the data'

const accessError = {
  status: 403,
  error: true,
  errorType: 'Access denied',
  errorMessage: 'You have no rights to save/update the data'
}

export {
  emptyData,
  secretError,
  encryptError,
  decryptError,
  accessError
}
