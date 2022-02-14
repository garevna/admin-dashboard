export const init = function () {
  const { $apiSecret, $apiKey } = window[Symbol.for('vue.prototype')]

  window[Symbol.for('admin.worker')].postMessage({
    route: 'crypto',
    action: 'init',
    data: {
      host: process.env.NODE_ENV === 'production' ? 'https://portal.dgtek.net' : 'https://portal.staging.dgtek.net',
      key: $apiKey(),
      secret: $apiSecret()
    }
  })
}
