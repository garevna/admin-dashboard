export function initError () {
  window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
    errorType: 'Init web-worker',
    errorMessage: 'Worker initialization failed'
  })
}
