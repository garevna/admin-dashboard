export function authError () {
  console.warn('AUTH ERROR')
  // window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
  //   error: true,
  //   errorType: 'Authentification error',
  //   errorMessage: 'Invalid login or password'
  // })
}
