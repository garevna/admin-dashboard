import { startWorker } from 'dgtek-portal-map-package/dist/start-worker'

import { refreshCallback } from './callbacks'

window.addEventListener('dgtek-portal-map-package-error', function (event) {
  console.warn(event)
})

const callback = () => {
  window[Symbol.for('vue.instance')].$emit('buildings-refreshed', true)
  refreshCallback({
    data: {
      status: 200,
      route: 'buildings',
      action: 'refresh'
    }
  })
}

export const createMapWorker = function (credentials, role) {
  const { $apiHost, $apiKey } = window[Symbol.for('vue.prototype')]
  window[Symbol.for('map.worker')] = startWorker(location.origin, $apiHost(), $apiKey(), credentials, role, callback)
}
