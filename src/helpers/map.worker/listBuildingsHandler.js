export const listBuildingsHandler = function () {
  window[Symbol.for('map.worker')].addEventListener('message', function (event) {
    const { status, action, store, result } = event.data
    if (action !== 'list') return

    window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)

    if (status !== 200) {
      window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        errorType: `${store} buildings`,
        errorMessage: 'Error reading the data'
      })
      return
    }

    // const eventName = `${store.toLowerCase()}-buildings-list`
    const eventName = 'buildings-list-received'
    window[Symbol.for('vue.instance')].$root.$emit(eventName, result)
  })
}
