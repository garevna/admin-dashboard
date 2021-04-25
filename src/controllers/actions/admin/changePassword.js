export const changePassword = function (data) {
  const { login, userPhone, password: newPass } = data
  if (!login || !userPhone || !newPass) {
    window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
      errorType: 'Update credentials',
      ErrorMessage: 'Invalid credentials\' values'
    })
    return
  }
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'admin',
    action: 'password',
    data: { login, userPhone, newPass }
  })
}
