const mapWorkerEvents = [
  'on-net',
  'footprint',
  'construction-commenced',
  'comming-soon',
  'not-available',
  'buildings-address-list',
  'buildings-data-list',
  'get-by-id',
  'get-by-address',
  'put',
  'post'
]

export const setBuildingHandlers = function () {
  mapWorkerEvents.forEach((eventName) => {
    window[Symbol.for('map.worker')].addEventListener(eventName, function (event) {
      window[Symbol.for('vue.instance')].$root.$emit(eventName, event.data)
    })
  })
}
