export function createMapWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  window[Symbol.for('map.worker')] = new Worker(`/${path}map.worker.js`)
  window[Symbol.for('map.worker')].onerror = function (error) {
    console.warn('Map worker Error\n', error)
  }
}
