import { startWorker } from 'dgtek-portal-map-package/dist/start-worker'

// import { refreshHandler } from './data-handlers'
import { refreshCallback } from './callbacks'

window.addEventListener('dgtek-portal-map-package-error', function (event) {
  console.warn(event)
})

const callback = () => {
  refreshCallback({
    data: {
      status: 200,
      route: 'footprint',
      action: 'refresh'
    }
  })
}

export const createMapWorker = function (credentials, role) {
  const { $apiHost, $apiKey } = window[Symbol.for('vue.prototype')]
  window[Symbol.for('map.worker')] = startWorker(location.origin, $apiHost(), $apiKey(), credentials, role, callback)
}
