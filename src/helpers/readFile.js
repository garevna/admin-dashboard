export const readFile = function (file) {
  return new Promise((resolve) => {
    const reader = Object.assign(new FileReader(), {
      onload: (event) => resolve({ body: event.target.result, error: null }),
      onerror: () => window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        errorType: 'File upload',
        errorMessage: `Error reading the file ${file.name}`
      })
      // resolve({ body: null, error: `Error reading the file ${file.name}` })
    })
    reader.readAsDataURL(file)
  })
}
