const fileTypeError = {
  status: 422,
  error: true,
  errorType: 'File upload',
  errorMessage: 'Invalid file type. Should be *.txt'
}

const fileReadError = {
  status: 409,
  error: true,
  errorType: 'File upload',
  errorMessage: 'Operation failed.'
}

export const importCustomers = (file) => new Promise((resolve, reject) => {
  if (file.type !== 'text/plain') return reject(fileTypeError)

  const reader = Object.assign(new FileReader(), {
    onload: event => resolve(event.target.result),
    onerror: () => reject(fileReadError)
  })
  reader.readAsText(file)
})
