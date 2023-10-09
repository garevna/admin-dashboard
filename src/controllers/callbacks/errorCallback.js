export function errorCallback (event) {
  const { errorType, errorMessage } = event.data
  window[Symbol.for('vue.instance')].$emit('open-error-popup', { errorType, errorMessage })
}
