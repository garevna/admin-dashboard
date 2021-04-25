export const buildingsErrorHandler = function () {
  window[Symbol.for('map.worker')].addEventListener('message', function (event) {
    if (event.data.error) {
      event.stopImmediatePropagation()
      window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)
      window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        errorType: event.data.errorType || 'Buildings',
        errorMessage: event.data.errorMessage || 'Unknown error'
      })
    }
  })
}
