export const readLocalFile = function (file) {
  return new Promise((resolve) => {
    const reader = Object.assign(new FileReader(), {
      onload: (event) => resolve({ status: 200, result: event.target.result }),
      onerror: () => resolve({
        status: 400,
        error: true,
        errorType: 'File Upload',
        errorMessage: `Error reading the file ${file.name}`
      })
    })
    reader.readAsDataURL(file)
  })
}
