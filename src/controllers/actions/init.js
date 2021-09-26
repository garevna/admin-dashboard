export const init = function () {
  const { $apiSecret, $apiKey /*, $apiHost */ } = window[Symbol.for('vue.prototype')]

  window[Symbol.for('admin.worker')].postMessage({
    route: 'crypto',
    action: 'init',
    data: {
      host: window[Symbol.for('api.host')],
      key: $apiKey(),
      secret: $apiSecret()
    }
  })

  window[Symbol.for('map.worker')].postMessage({ action: 'host', host: window[Symbol.for('api.host')] })

  window[Symbol.for('map.worker')].postMessage({ action: 'init' })
}
