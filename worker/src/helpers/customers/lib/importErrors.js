const fileTypeError = {
  status: 422,
  error: true,
  errorType: 'File upload',
  errorMessage: 'Invalid file type. Should be *.txt',
  result: null
}

const fileReadError = {
  status: 409,
  error: true,
  errorType: 'File upload',
  errorMessage: 'Operation failed.',
  result: null
}

const fileParseError = {
  status: 422,
  error: true,
  errorType: 'Parse file content',
  errorMessage: 'Bad content. Not a JSON string',
  result: null
}

const searchError = {
  status: 300,
  key: 'import-customer-updates',
  title: 'Seach customers in DB by unique code',
  message: 'Customer not found',
  // error: true,
  // errorType: 'Seach customers in DB by unique code',
  // errorMessage: 'One or more customers not found',
  result: null
}

const partnerSearchError = {
  status: 300,
  key: 'import-customer-updates',
  title: 'Partner for customer not found',
  message: 'Broken link to partner',
  // status: 409,
  // error: true,
  // errorType: 'Partner for customer not found',
  // errorMessage: 'Broken link to partner',
  result: null
}

export {
  fileTypeError,
  fileReadError,
  fileParseError,
  searchError,
  partnerSearchError
}
