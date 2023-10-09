export const saveBuildingHandler = function () {
  window[Symbol.for('map.worker')].addEventListener('message', function (event) {
    const { status, action } = event.data
    if (action !== 'put' && action !== 'post') return

    event.stopImmediatePropagation()
    window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)

    if (status === 200) {
      const eventName = action === 'post' ? 'new-building-created' : 'buildings-data-saved'
      window[Symbol.for('vue.instance')].$root.$emit(eventName, event.data)

      window[Symbol.for('vue.instance')].$root.$emit('open-message-popup', {
        messageType: 'Building details',
        messageText: 'Data saved'
      })
      return
    }

    window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
      errorType: 'Building details',
      errorMessage: 'Operaion faled. Data was not saved'
    })
  })
}
