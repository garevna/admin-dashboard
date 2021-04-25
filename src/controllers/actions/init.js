export const init = function () {
  const { $apiSecret, $apiKey, $apiHost } = window[Symbol.for('vue.prototype')]

  window[Symbol.for('admin.worker')].postMessage({
    route: 'crypto',
    action: 'init',
    data: {
      host: $apiHost(),
      key: $apiKey(),
      secret: $apiSecret()
    }
  })
}
