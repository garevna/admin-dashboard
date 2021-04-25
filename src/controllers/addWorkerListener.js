import { events /*, errors */ } from './'

export const addWorkerListener = function (routeName, actionName) {
  window[Symbol.for('vue.prototype')].__worker.addEventListener('message', function (event) {
    const { status, route, action } = event.data
    if (action === 'init') return

    if (route !== routeName || action !== actionName) return

    event.stopImmediatePropagation()

    console.log(status, route, action, ' EVENT:', events[route][action])

    window[Symbol.for('vue.prototype')].$dispatchProgressEvent(false)
    window[Symbol.for('vue.instance')].$root.$emit(events[route][action], event.data)
  })
}
