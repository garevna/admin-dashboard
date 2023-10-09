export const getBuildingHandler = function () {
  window[Symbol.for('map.worker')].addEventListener('message', function (event) {
    const { status, action, /* store, key, */ result } = event.data
    if (action !== 'getById' && action !== 'getByAddress') return

    event.stopImmediatePropagation()
    window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)

    if (status === 200) return window[Symbol.for('vue.instance')].$root.$emit('building-data-received', { ...result })

    window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
      messageType: 'Reading the building details',
      messageText: 'Operaion faled. Data was not received'
    })
  })
}
